/** @type {import("stylelint").Config} */
export default {
	extends: ['stylelint-config-standard', 'stylelint-config-standard-scss'],
	rules: {
		'selector-class-pattern': null,
		'color-function-alias-notation': null,
		'property-no-vendor-prefix': null,
	},
	ignoreFiles: ['**/dist/**'],
}
