import { execSync } from 'child_process'
import fs from 'fs'

fs.mkdirSync('build', { recursive: true })

execSync(
	'npx globstar -- npx handlebars src/**/*.hbs -m -f build/precompiled.js',
	{
		stdio: 'inherit',
	},
)
