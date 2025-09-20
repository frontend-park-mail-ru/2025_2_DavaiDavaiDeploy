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
	},

	ignore: ['public/build/**', 'node_modules/**'],
}
