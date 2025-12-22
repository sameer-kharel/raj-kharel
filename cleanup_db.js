const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Manually read .env file
let uri;
try {
    const envContent = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
    const match = envContent.match(/MONGODB_URI=(.*)/);
    if (match) {
        uri = match[1].trim();
    }
} catch (e) {
    console.error('Error reading .env file:', e.message);
}

if (!uri) {
    console.error('MONGODB_URI not found in .env');
    process.exit(1);
}

async function run() {
    console.log('Connecting to database...');
    const client = new MongoClient(uri);
    try {
        await client.connect();
        const db = client.db('raj-kharel');
        const collection = db.collection('checklists');

        console.log('Checking current indexes...');
        const indexes = await collection.listIndexes().toArray();
        console.log('Found indexes:', indexes.map(i => i.name).join(', '));

        const indexToDrop = 'client_1_listing_1';
        if (indexes.some(i => i.name === indexToDrop)) {
            console.log(`Attempting to drop legacy unique index: ${indexToDrop}`);
            await collection.dropIndex(indexToDrop);
            console.log(`Successfully dropped index ${indexToDrop}`);
        } else {
            console.log(`Index ${indexToDrop} not found.`);
        }

        // Also check for client_1_type_1 if it was unique
        const indexToDrop2 = 'client_1_type_1';
        if (indexes.some(i => i.name === indexToDrop2)) {
            console.log(`Attempting to drop index: ${indexToDrop2}`);
            await collection.dropIndex(indexToDrop2);
            console.log(`Successfully dropped index ${indexToDrop2}`);
        }

        console.log('Database cleanup complete.');
    } catch (e) {
        console.error('An error occurred:', e.message);
    } finally {
        await client.close();
    }
}

run().catch(console.dir);
