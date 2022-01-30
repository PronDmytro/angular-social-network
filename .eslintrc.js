module.exports = {
  root: true,
  env: {
    es2021: true,
  },
  extends: ['google'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  rules: {
    'max-len': ['error', { code: 140 }],
    'new-cap': ['warn', { 'capIsNew': false }],
    'require-jsdoc': 'off',
    'valid-jsdoc': ['warn', {
      'requireParamType': false, 'requireReturnType': false,
      'prefer': { 'return': 'returns', 'arg': 'param', 'argument': 'param' },
    },
    ],
    'indent': ['error', 2],
    'no-invalid-this': 'off',
    'padded-blocks': ['error', { 'classes': 'always' }],
    '@typescript-eslint/explicit-member-accessibility': ['error'],
    'object-curly-spacing': ['error', 'always'],
    '@typescript-eslint/type-annotation-spacing': ['error'],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['warn'],
  },
};
