module.exports = {
  parser: "@typescript-eslint/parser",
  plugins: ["prettier", "simple-import-sort", "@typescript-eslint"],
  extends: ["prettier", "plugin:@typescript-eslint/recommended"],
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["error"],
    "@typescript-eslint/no-namespace": "off",
    "prettier/prettier": "error",
    "no-console": 1,
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
    // Code complexity rules
    complexity: ["error", 20],
    "max-depth": ["error", 5],
    "max-nested-callbacks": ["error", 3],
    "max-statements": ["error", 20],
    "max-lines": ["error", 800],
    "eol-last": ["error", "always"],
    "no-restricted-imports": [
      "error",
      {
        patterns: [".*"],
      },
    ],
    "no-restricted-syntax": [
      "error",
      {
        selector: "ImportDeclaration[specifiers.length = 0]",
        message: "Empty imports are not allowed",
      },
    ],
  },
  env: {
    node: true,
    es2021: true,
  },
};
