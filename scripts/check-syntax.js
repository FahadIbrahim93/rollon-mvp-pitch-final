const { execSync } = require('node:child_process');
execSync('for f in js/*.js three-bg.js; do node --check "$f"; done', { stdio: 'inherit', shell: '/bin/bash' });
