import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import importPlugin from 'eslint-plugin-import'
import { defineConfig } from 'eslint/config'
import globals from 'globals'

export default defineConfig([
	{
		files: ['**/*.{js,mjs,cjs}'],
		plugins: { js, import: importPlugin },
		extends: [
			'js/recommended',
			eslintConfigPrettier,
		],
		languageOptions: {
			globals: {
				...globals.browser,
				Handlebars: 'readonly',
			},
		},
		rules: {
			'no-unused-vars': 'error',
			'no-undef': 'error',
			curly: 'error',
			'no-console': 'error',
			'import/no-cycle': 'error',
			'no-multiple-empty-lines': 'error',
		},
		ignores: ['node_modules/', 'public/src/handlebars/**', 'public/build/**'],
	},
])
