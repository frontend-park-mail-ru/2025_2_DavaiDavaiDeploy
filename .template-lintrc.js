// .template-lintrc.js
module.exports = {
	extends: null,

	rules: {
		// Отключаем Ember-специфичные правила
		'no-curly-component-invocation': 'off',
		'no-implicit-this': 'off',
		'no-bare-strings': 'off',
		'require-button-type': 'off',

		// Включаем полезные общие правила
		'no-html-comments': 'error',
		'no-triple-curlies': 'error',
		'no-unused-block-params': 'error',
		'linebreak-style': 'off',
		'eol-last': 'always',
		'no-multiple-empty-lines': 'error',
		'no-trailing-spaces': 'error',
		quotes: ['error', 'double'],
	},

	ignore: ['public/build/**', 'node_modules/**'],
}
