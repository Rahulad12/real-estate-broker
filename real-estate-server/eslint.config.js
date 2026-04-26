const globals = require('globals');
const tseslint = require('@typescript-eslint/eslint-plugin');
const js = require('@eslint/js');

module.exports = [
  {
    files: ['**/*.ts'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module', // Changed to 'module' for compatibility if needed, but might need 'script' for commonjs. Let's stick to module for now and see.
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: ['./tsconfig.json'],
      },
      globals: {
        node: true,
      },
    },
    rules: {
      ...tseslint.rules,
      // Add any specific server-side rules here if needed
      // For example:
      // "@typescript-eslint/no-unused-vars": "warn", // Example rule
    },
    ignores: ['node_modules', 'dist', 'build'],
  },
];