module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['standard'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  ignore: ['.eslintrc.js'],
  plugins: ['@typescript-eslint'],
  rules: {
    'comma-dangle': [
      'error',
      {
        arrays: 'never',
        objects: 'never',
      },
    ],
  },
}