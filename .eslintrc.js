module.exports = {
  env: {
    es2021: true,
    node: true
  },
  extends: 'standard',
  overrides: [
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    '@typescript-eslint'
  ],
  rules: {
  },
  ignorePatterns: ['**/src/@types/*']
}
