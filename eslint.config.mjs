import js from '@eslint/js'
import stylisticPlugin from '@stylistic/eslint-plugin'
import eslintConfigPrettier from 'eslint-config-prettier'
import compatPlugin from 'eslint-plugin-compat'
import importPlugin from 'eslint-plugin-import'
import sonarjs from 'eslint-plugin-sonarjs'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
	{
		files: ['**/*.{js,mjs,cjs}'],
		plugins: {
			js,
			compat: compatPlugin,
			'@stylistic/js': stylisticPlugin,
			import: importPlugin,
		},
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
			'@stylistic/js/padding-line-between-statements': [
				'error',
				{
					blankLine: 'always',
					prev: [
						'multiline-expression',
						'multiline-let',
						'multiline-const',
						'multiline-block-like',
					],
					next: '*',
				},
				{
					blankLine: 'always',
					prev: '*',
					next: ['export', 'block-like', 'class'],
				},
			],
			'sonarjs/cognitive-complexity': ['error', 15],
			'sonarjs/no-identical-functions': 'error',
			'sonarjs/no-all-duplicated-branches': 'error',
			'sonarjs/no-duplicate-string': 'error',
			'sonarjs/prefer-immediate-return': 'error',
			'import/no-cycle': 'error',
			'import/order': [
				'error',
				{
					groups: [
						'builtin',
						'external',
						'internal',
						'parent',
						'sibling',
						'index',
					],
					alphabetize: { order: 'asc' },
					pathGroups: [
						{ pattern: '*.css', group: 'sibling', position: 'after' },
						{ pattern: '*.scss', group: 'sibling', position: 'after' },
					],
				},
			],
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
			'@stylistic/js': stylisticPlugin,
			import: importPlugin,
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
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unsafe-function-type': 'off',
			'@stylistic/js/padding-line-between-statements': [
				'error',
				{
					blankLine: 'always',
					prev: [
						'multiline-expression',
						'multiline-let',
						'multiline-const',
						'multiline-block-like',
					],
					next: '*',
				},
				{
					blankLine: 'always',
					prev: '*',
					next: ['export', 'block-like', 'class'],
				},
			],
			'import/order': [
				'error',
				{
					groups: [
						'builtin',
						'external',
						'internal',
						'parent',
						'sibling',
						'index',
					],
					alphabetize: { order: 'asc' },
					pathGroups: [
						{ pattern: '*.css', group: 'sibling', position: 'after' },
						{ pattern: '*.scss', group: 'sibling', position: 'after' },
					],
				},
			],
			'import/no-cycle': 'error',
			curly: 'error',
			'compat/compat': 'error',
			'no-console': 'error',
			'no-multiple-empty-lines': 'error',
			'no-useless-return': 'error',
			'sonarjs/cognitive-complexity': ['error', 20],
			'sonarjs/no-identical-functions': 'error',
			'sonarjs/no-all-duplicated-branches': 'error',
			'sonarjs/no-duplicate-string': 'error',
			'sonarjs/prefer-immediate-return': 'error',
		},
		ignores: ['node_modules/', '**/build/**', 'dist/**'],
	},
])
