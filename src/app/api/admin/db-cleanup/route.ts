import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Checklist from '@/models/Checklist';

export async function GET(request: NextRequest) {
    try {
        await dbConnect();
        const collection = Checklist.collection;

        const results: string[] = [];

        console.log('Fetching current indexes...');
        const indexes = await collection.listIndexes().toArray();
        const indexNames = indexes.map(i => i.name);
        results.push(`Current indexes: ${indexNames.join(', ')}`);

        const toDrop = ['client_1_listing_1', 'client_1_type_1'];

        for (const indexName of toDrop) {
            if (indexNames.includes(indexName)) {
                try {
                    await collection.dropIndex(indexName);
                    results.push(`Successfully dropped: ${indexName}`);
                } catch (e: any) {
                    results.push(`Error dropping ${indexName}: ${e.message}`);
                }
            } else {
                results.push(`Index not found: ${indexName}`);
            }
        }

        return NextResponse.json({
            message: 'Database cleanup result',
            details: results
        });
    } catch (error: any) {
        return NextResponse.json({
            error: error.message,
            stack: error.stack
        }, { status: 500 });
    }
}
