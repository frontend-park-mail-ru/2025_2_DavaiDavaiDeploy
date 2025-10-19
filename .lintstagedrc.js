export default {
	'*.{js,jsx,ts,tsx,mjs}': [
		'npm run lint:eslint:fix',
		'npm run lint:prettier:fix',
	],
	'*.{css,scss,sass,less}': [
		'npm run lint:stylelint:fix',
		'npm run lint:prettier:fix',
	],
	'*.{ts,tsx}': () => 'npm run tsc:check',
}
