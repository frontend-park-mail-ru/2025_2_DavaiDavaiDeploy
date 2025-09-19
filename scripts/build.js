import { execSync } from 'child_process'
import fs from 'fs'

fs.mkdirSync('public/build', { recursive: true })

execSync(
	'npx globstar -- npx handlebars public/src/**/*.hbs -m -f public/build/precompiled.js',
	{
		stdio: 'inherit',
	},
)
