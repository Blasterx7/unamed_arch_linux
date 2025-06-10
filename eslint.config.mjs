import globals from "globals";
import js from "@eslint/js";
import babelParser from "@babel/eslint-parser";
import pluginVue from "eslint-plugin-vue"; // Still need this for plugin.configs.base if used or for processor
import vueParser from "vue-eslint-parser";

export default [
  // ESLint recommended configuration for .js files
  {
    ...js.configs.recommended,
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"], // Apply only to JS files
  },

  // Global language options (minimal)
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

  // Basic Vue configuration for .vue files
  {
    files: ["**/*.vue"],
    plugins: {
      // vue: pluginVue, // Not spreading full rule sets initially
    },
    languageOptions: {
      parser: vueParser, // vue-eslint-parser for .vue files
      parserOptions: {
        parser: babelParser, // Use @babel/eslint-parser for <script> blocks
        sourceType: "module",
        ecmaVersion: "latest",
        requireConfigFile: false, // Crucial for @babel/eslint-parser if no Babel config file
        babelOptions: {
          // No presets initially to minimize complexity; only basic parsing.
          // If syntax errors occur, a minimal preset might be needed.
          babelrc: false,
          configFile: false,
        },
      },
    },
    // Only the most basic Vue rules necessary for parsing might come from pluginVue.configs.base
    // For now, let's rely on just parsing and js.configs.recommended for script blocks.
    // If 'pluginVue.configs.base.rules' is needed for the processor to work, it can be added back.
    // rules: {
    //   ...pluginVue.configs.base.rules, // Contains processor and basic parsing rules
    // }
  },

  // Minimal custom rules (if any)
  {
    rules: {
      'semi': ['error', 'never'], // Example simple rule
      'no-console': 'warn', // Allow console but warn
    },
  },
];
