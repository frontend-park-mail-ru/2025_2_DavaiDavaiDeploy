import { execSync } from 'child_process'
import fs from 'fs'

fs.mkdirSync('build', { recursive: true })

execSync(
	'npx handlebars src/components/logo/logo.hbs -f build/partials/logo.js -p',
	{ stdio: 'inherit' },
)

execSync(
	'npx globstar -- npx handlebars src/**/*.hbs -m -f build/precompiled.js ',
	{
		stdio: 'inherit',
	},
)
