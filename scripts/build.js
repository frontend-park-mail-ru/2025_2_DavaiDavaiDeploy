import fs from 'fs';
import { execSync } from 'child_process';

fs.mkdirSync('public/build', { recursive: true });

execSync('npx globstar -- npx handlebars public/src/**/*.hbs -m -f public/build/precompiled.js', {
    stdio: 'inherit'
});