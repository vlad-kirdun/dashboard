import js from '@eslint/js';
import queryPlugin from '@tanstack/eslint-plugin-query';
import { globalIgnores } from 'eslint/config';
import importPlugin from 'eslint-plugin-import';
import prettierPlugin from 'eslint-plugin-prettier';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config([
	globalIgnores(['dist']),
	{
		files: ['**/*.{js,ts,tsx}'],
		extends: [
			js.configs.recommended,
			tseslint.configs.recommended,
			queryPlugin.configs['flat/recommended'],
			reactHooksPlugin.configs['recommended-latest'],
			reactRefreshPlugin.configs.vite,
		],
		plugins: {
			prettier: prettierPlugin,
			import: importPlugin,
		},
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
		},
	},
	{
		rules: {
			eqeqeq: ['error', 'always'],
			'prettier/prettier': 'error',
			'import/order': [
				'error',
				{
					groups: [['builtin', 'external'], ['internal'], ['parent', 'sibling', 'index'], ['type']],
					pathGroups: [
						{ pattern: '@/app**', group: 'internal', position: 'before' },
						{ pattern: '@/pages**', group: 'internal', position: 'before' },
						{ pattern: '@/widgets**', group: 'internal', position: 'before' },
						{ pattern: '@/features**', group: 'internal', position: 'before' },
						{ pattern: '@/entities**', group: 'internal', position: 'before' },
						{ pattern: '@/shared**', group: 'internal', position: 'before' },
						{ pattern: '@/shared/**', group: 'internal', position: 'before' },
					],
					alphabetize: { order: 'asc', caseInsensitive: true },
					'newlines-between': 'always',
				},
			],
		},
	},
]);
