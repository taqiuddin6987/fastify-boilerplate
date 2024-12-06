const pluginJs = require('@eslint/js');
const pluginImport = require('eslint-plugin-import');
const pluginPrettierRecommended = require('eslint-plugin-prettier/recommended');
const pluginPromise = require('eslint-plugin-promise');
const globals = require('globals');

module.exports = [
  {
    languageOptions: {
      globals: globals.node,
      ecmaVersion: 'latest',
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
  pluginJs.configs.recommended,
  pluginImport.flatConfigs.recommended,
  pluginPromise.configs['flat/recommended'],
  pluginPrettierRecommended,
  {
    rules: {
      'no-console': 'warn',
      'import/no-unresolved': 'off',
      'import/named': 'off',
      'import/namespace': 'off',
      'import/no-named-as-default': 'off',
      'import/default': 'off',
      'import/no-named-as-default-member': 'off',
      'no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
    },
  },
];
