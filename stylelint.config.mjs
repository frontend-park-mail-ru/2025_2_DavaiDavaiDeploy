/** @type {import("stylelint").Config} */
export default {
	extends: ['stylelint-config-standard', 'stylelint-config-standard-scss'],
	rules: {
		'selector-class-pattern': null,
		'color-function-alias-notation': null,
		'property-no-vendor-prefix': null,
		'custom-property-empty-line-before': null,
		'scss/at-import-partial-extension': null,
		'color-no-hex': true,
		'color-named': 'never',
		'media-feature-range-notation': 'prefix',
	},
	ignoreFiles: ['**/dist/**'],
};
