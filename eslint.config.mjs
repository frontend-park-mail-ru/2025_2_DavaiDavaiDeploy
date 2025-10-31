import js from '@eslint/js';
import stylisticPlugin from '@stylistic/eslint-plugin';

import { defineConfig } from 'eslint/config';

import eslintConfigPrettier from 'eslint-config-prettier';
import compatPlugin from 'eslint-plugin-compat';
import importPlugin from 'eslint-plugin-import';
import sonarjs from 'eslint-plugin-sonarjs';
import globals from 'globals';
import tseslint from 'typescript-eslint';

const Rules = {
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
	'import/no-cycle': 'error',
	'sonarjs/no-identical-functions': 'error',
	'sonarjs/no-all-duplicated-branches': 'error',
	'sonarjs/no-duplicate-string': 'error',
	'sonarjs/prefer-immediate-return': 'error',
	'sonarjs/prefer-regexp-exec': 'off',
};

const Ignores = [
	'node_modules/',
	'**/build/**',
	'dist/**',
	'src/modules/react/**',
];

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
			...Rules,
			'no-unused-vars': 'error',
			'no-undef': 'error',
			'sonarjs/cognitive-complexity': ['error', 15],
		},
		ignores: [...Ignores, '.template-lintrc.js', '.lintstagedrc.js'],
	},
	{
		files: ['**/*.{ts,tsx}'],
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
			globals: { ...globals.browser },
		},
		rules: {
			...Rules,
			'no-console': 'error',
			'@typescript-eslint/no-empty-object-type': 'off',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{ argsIgnorePattern: '^_' },
			],
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-unsafe-function-type': 'off',
			'sonarjs/cognitive-complexity': ['error', 20],
		},
		ignores: Ignores,
	},
]);
