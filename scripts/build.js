import { execSync } from 'child_process'
import fs from 'fs'

fs.mkdirSync('src/build', { recursive: true })

fs.mkdirSync('src/build/partials', { recursive: true })

execSync(
	'npx handlebars src/components/logo/logo.hbs -f src/build/partials/logo.js -p',
	{ stdio: 'inherit' },
)

execSync(
	'npx globstar -- npx handlebars src/**/*.hbs -m -f src/build/precompiled.js ',
	{
		stdio: 'inherit',
	},
)
