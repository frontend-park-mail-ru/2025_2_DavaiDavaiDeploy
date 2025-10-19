import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'
import compatPlugin from 'eslint-plugin-compat'
import sonarjs from 'eslint-plugin-sonarjs'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
	{
		files: ['**/*.{js,mjs,cjs}'],
		plugins: { js, compat: compatPlugin },
		extends: [
			'js/recommended',
			eslintConfigPrettier,
			sonarjs.configs.recommended,
		],
		languageOptions: { globals: { ...globals.browser } },
		rules: {
			'no-unused-vars': 'error',
			'no-undef': 'error',
			curly: 'error',
			'compat/compat': 'error',
			'no-console': 'error',
			'no-multiple-empty-lines': 'error',
			'no-useless-return': 'error',
			'sonarjs/cognitive-complexity': ['error', 15],
			'sonarjs/no-identical-functions': 'error',
			'sonarjs/no-all-duplicated-branches': 'error',
			'sonarjs/no-duplicate-string': 'error',
			'sonarjs/prefer-immediate-return': 'error',
		},
		ignores: [
			'node_modules/',
			'**/build/**',
			'.template-lintrc.js',
			'.lintstagedrc.js',
			'dist/**',
		],
	},

	{
		files: ['**/*.{ts}'],
		plugins: {
			'@typescript-eslint': tseslint.plugin,
			compat: compatPlugin,
		},
		extends: [
			...tseslint.configs.recommended,
			eslintConfigPrettier,
			sonarjs.configs.recommended,
		],
		languageOptions: {
			parser: tseslint.parser,
			parserOptions: {
				project: ['./tsconfig.json'],
				sourceType: 'module',
				ecmaVersion: 'latest',
			},
			globals: {
				...globals.browser,
			},
		},
		rules: {
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_' },
			],
			'@typescript-eslint/no-explicit-any': 'warn',
			curly: 'error',
			'compat/compat': 'error',
			'no-console': 'error',
			'no-multiple-empty-lines': 'error',
			'no-useless-return': 'error',
			'sonarjs/cognitive-complexity': ['error', 15],
			'sonarjs/no-identical-functions': 'error',
			'sonarjs/no-all-duplicated-branches': 'error',
			'sonarjs/no-duplicate-string': 'error',
			'sonarjs/prefer-immediate-return': 'error',
		},
		ignores: ['node_modules/', '**/build/**', 'dist/**'],
	},
])
