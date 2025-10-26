import js from '@eslint/js';
import ts from 'typescript-eslint';
import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import globals from 'globals';

export default [
  {
    ignores: [ 'dist/**', 'src/shadcn/**' ],
    files: [ '**/*.{js,ts,vue}' ],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      'ts': ts.plugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...ts.configs.recommended[0].rules,

      'semi': [ 'error', 'always' ],
      'no-unused-vars': [ 'warn', {
        vars: 'all',
        args: 'after-used',
        caughtErrors: 'all',
        ignoreRestSiblings: true,

        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      }],
      'no-useless-escape': 'off',
      'no-prototype-builtins': 'off',
      'no-constant-binary-expression': 'off',

      'ts/no-explicit-any': 'off',
      'ts/no-non-null-assertion': 'off',
    },
  },
  {
    files: [ '**/*.{js,ts}' ],
    languageOptions: {
      parser: ts.parser,
    },
  },
  {
    files: [ '**/*.vue' ],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        parser: {
          ts: ts.parser
        },
      },
    },
    plugins: {
      vue,
    },
    rules: {
      ...vue.configs['flat/recommended'].rules,

      'vue/no-v-html': 'off',
      'vue/order-in-components': 'off',
      'vue/attributes-order': 'off',
      'vue/multi-word-component-names': 'off',
    },
  },
];
