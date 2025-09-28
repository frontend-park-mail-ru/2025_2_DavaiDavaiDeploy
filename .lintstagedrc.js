export default {
	'*.{js,jsx,ts,tsx,mjs}': [
		'npm run lint:eslint:fix',
		'npm run lint:prettier:fix',
	],
	'*.{css,scss,sass,less}': [
		'npm run lint:stylelint:fix',
		'npm run lint:prettier:fix',
	],
	'*.{json,md,html,yaml,yml}': ['npm run lint:prettier:fix'],
	'*.hbs': 'npm run lint:prettier:fix',
}
