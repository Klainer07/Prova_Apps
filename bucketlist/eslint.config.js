import js from '@eslint/js';
import globals from 'globals';
import prettierPlugin from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';
export default defineConfig([
  js.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: globals.node,
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // Suas regras personalizadas
      'prefer-const': 'error',
      'no-console': 'warn',
      'consistent-return': 'warn',
      'prefer-template': 'warn',
      // Regras do Prettier via ESLint
      'prettier/prettier': 'error',
    },
  },
]);
