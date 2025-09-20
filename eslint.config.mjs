import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import hbs from 'eslint-plugin-hbs'
import { defineConfig } from 'eslint/config'
import globals from 'globals'

export default defineConfig([
	{
		files: ['**/*.{js,mjs,cjs}'],
		plugins: { js, hbs },
		extends: ['js/recommended', eslintConfigPrettier],
		languageOptions: {
			globals: {
				...globals.browser,
				Handlebars: 'readonly',
			},
		},
		rules: {
			'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
			'no-undef': 'error',
			curly: 'error',
			'hbs/check-hbs-template-literals': 2,
		},
		ignores: ['node_modules/', 'public/src/handlebars/**', 'public/build/**'],
	},
])
