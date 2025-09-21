import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import compatPlugin from 'eslint-plugin-compat'
import { defineConfig } from 'eslint/config'
import globals from 'globals'

export default defineConfig([
	{
		files: ['**/*.{js,mjs,cjs}'],
		plugins: { js, compat: compatPlugin },
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
			'compat/compat': 'error',
		},
		ignores: [
			'node_modules/',
			'src/handlebars/**',
			'build/**',
			'.template-lintrc.js',
			'.lintstagedrc.js',
		],
	},
])
