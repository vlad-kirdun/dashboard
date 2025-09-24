import eslint from '@eslint/js';
import { defineConfig } from 'eslint/config';
import prettierPlugin from 'eslint-plugin-prettier';
import jestPlugin from 'eslint-plugin-jest';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig(
	{
		ignores: ['**/build/**', '**/dist/**'],
	},
	eslint.configs.recommended,
	{
		plugins: {
			'@typescript-eslint': tseslint.plugin,
			jest: jestPlugin,
			prettier: prettierPlugin,
		},
		languageOptions: {
			globals: {
				...globals.node,
				...globals.jest,
			},
			parser: tseslint.parser,
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	{
		rules: {
			eqeqeq: ['error', 'always'],
			'prettier/prettier': 'error',
			'@typescript-eslint/no-explicit-any': 'off',
			'@typescript-eslint/no-floating-promises': 'warn',
			'@typescript-eslint/no-unsafe-argument': 'warn',
		},
	},
	{
		files: ['**/*.js'],
		extends: [tseslint.configs.disableTypeChecked],
	},
	{
		files: ['test/**'],
		extends: [jestPlugin.configs['flat/recommended']],
	},
);
