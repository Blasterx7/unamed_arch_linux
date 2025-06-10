import globals from "globals";
import js from "@eslint/js";
import babelParser from "@babel/eslint-parser";
import pluginVue from "eslint-plugin-vue";
import vueParser from "vue-eslint-parser";
import prettierPlugin from "eslint-plugin-prettier";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  // Global language options - applies to all files by default
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },

  // ESLint recommended configuration
  js.configs.recommended,

  // Vue recommended configuration
  ...pluginVue.configs['flat/recommended'],

  // Configuration for JavaScript files (.js, .mjs, .cjs)
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
    languageOptions: {
      parser: babelParser,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false,
        },
      },
    }
  },

  // Configuration specifically for Vue files
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueParser, // vue-eslint-parser for .vue files
      parserOptions: {
        parser: babelParser, // Use babel-eslint for <script> blocks
        sourceType: "module",
        ecmaVersion: "latest",
        requireConfigFile: false,
        babelOptions: {
          babelrc: false,
          configFile: false,
        },
      },
    },
    rules: {
      'vue/max-attributes-per-line': 'off',
    }
  },

  // Prettier configuration
  // This should be after other rule configurations to override them
  // eslint-plugin-prettier's recommended config includes eslint-config-prettier
  prettierPlugin.configs.recommended,
  eslintConfigPrettier, // Explicitly add eslint-config-prettier to be sure it overrides styling rules

  // Custom rules & Overrides for Prettier
  // This section must come AFTER prettierPlugin.configs.recommended and eslintConfigPrettier
  {
    rules: {
      'semi': ['error', 'never'], // Already matches Prettier's default, but good to be explicit
      'prettier/prettier': ['error', { 'semi': false, 'singleQuote': false }], // ensure singleQuote is false to match default prettier behavior
    },
  },
];
