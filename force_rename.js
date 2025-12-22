const fs = require('fs');
const path = require('path');

const target = path.join('d:', 'work_shameer', 'raj-kharel', 'src', 'app', 'api', 'socket', 'route.ts');
const dest = target + '.DISABLED';

try {
    if (fs.existsSync(target)) {
        fs.renameSync(target, dest);
        console.log('SUCCESS: Renamed to ' + dest);
    } else {
        console.log('TARGET NOT FOUND: ' + target);
    }
} catch (err) {
    console.error('FAILURE: ' + err.message);
    if (err.code === 'EBUSY') {
        console.log('Reason: File is busy or locked by another process.');
    }
}
