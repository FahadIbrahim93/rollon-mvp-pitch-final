const fs = require('node:fs');
const path = require('node:path');

const htmlFiles = fs.readdirSync('.').filter((f) => f.endsWith('.html'));
const missing = [];

for (const file of htmlFiles) {
    const text = fs.readFileSync(file, 'utf8');
    const matches = [...text.matchAll(/(?:src|href)="([^"]+)"/g)];
    for (const [, ref] of matches) {
        if (/^(https?:|#|mailto:|tel:|data:)/.test(ref)) continue;
        if (!fs.existsSync(path.resolve(ref))) missing.push(`${file} -> ${ref}`);
    }
}

if (missing.length) {
    console.error('Missing references found:\n' + missing.join('\n'));
    process.exit(1);
}
console.log('All local HTML references resolved.');
