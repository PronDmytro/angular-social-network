module.exports = {
  root: false,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    './../../.eslintrc.js',
  ],
  overrides: [
    {
      files: ['src//*.ts'],
      parserOptions: {
        project: 'tsconfig.json',
        sourceType: 'module',
      },
      env: {
        node: true,
      },
    },
    {
      files: ['src//*.spec.ts', 'src//*.d.ts', 'test//*.api-spec.ts'],
      parserOptions: {
        project: 'tsconfig.spec.json',
      },
      extends: ['plugin:jest/recommended', 'plugin:jest-formatting/recommended'],
      plugins: ['jest', 'jest-formatting'],
      env: {
        jest: true,
      },
      rules: {
        'jest/expect-expect': [
          'error',
          {
            'assertFunctionNames': ['expect', '*.**.expect', '*.expect'],
          },
        ],
      },
    },
  ],
  rules: {
    quotes: ['error', 'single', { 'avoidEscape': true }],
  },
};
