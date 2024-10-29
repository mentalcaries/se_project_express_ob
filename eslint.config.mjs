import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    rules: {
      "no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
      "no-console": "error",
      "no-debugger": "error",
      "no-alert": "error",
    },
  },
  {
    files: ["**/*.js"],
    languageOptions: { sourceType: "commonjs" },
    rules: {
      "no-var": "error",
      "prefer-const": "error",
    },
  },
  {
    languageOptions: { globals: globals.browser },
    rules: {
      "no-undef": "error",
      "no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
    },
  },
  {
    ...pluginJs.configs.recommended,
    rules: {
      "no-undef": "error",
      "no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
    },
  },
  {
    ...pluginReact.configs.flat.recommended,
    rules: {
      "no-undef": "error",
      "no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
    },
  },
];