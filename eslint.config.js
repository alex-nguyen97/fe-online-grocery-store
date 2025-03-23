import config from "eslint-config-standard";

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...[].concat(config),
  {
    rules: {
      // Add custom rules here
      "no-console": "warn",
      "semi": ["error", "always"],
      "indent": ["error", 4], // Enforce 4 spaces for indentation
    },
    plugins: [
      // Add custom plugins here
      "react",
    ],
    extends: [
      // Add additional configurations here
      "plugin:react/recommended",
    ],
  },
];