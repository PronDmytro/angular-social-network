module.exports = {
  root: false,
  extends: [
    './../../.eslintrc.js',
  ],
  overrides: [
    {
      files: ['*.ts'],
      parserOptions: {
        project: ['tsconfig.?.json'],
        createDefaultProgram: true,
      },
    },
    {
      files: ['*.component.html'],
      plugins: ['html'],
      rules: {
        'max-len': ['error', { code: 120 }],
      },
    },
    {
      files: ['src//*.spec.ts', 'src//*.d.ts'],
      parserOptions: {
        project: './tsconfig.spec.json',
      },
      extends: ['plugin:jasmine/recommended'],
      plugins: ['jasmine'],
      env: { jasmine: true },
      rules: {
        '@typescript-eslint/no-unused-vars': 'off',
      },
    },
  ],
  rules: {},
};
