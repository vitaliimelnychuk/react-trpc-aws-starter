module.exports = {
  root: true,
  plugins: ['prettier', 'simple-import-sort', 'i18next'],
  extends: ['prettier', 'react-app', 'react-app/jest'],
  rules: {
    'eol-last': ['error', 'always'],
    'no-restricted-imports': [
      'error',
      {
        patterns: ['.*']
      }
    ],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ImportDeclaration[specifiers.length = 0]',
        message: 'Empty imports are not allowed'
      }
    ],
    'i18next/no-literal-string': [
      'warn',
      {
        markupOnly: true
      }
    ],
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto'
      }
    ],
    'no-console': 1,
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error'
  },
  overrides: [
    {
      files: ['*test.ts', '*test.tsx'],
      rules: {
        'i18next/no-literal-string': 'off'
      }
    }
  ]
};
