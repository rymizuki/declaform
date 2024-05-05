/** @type {import('eslint').Linter.Config} */
module.exports = {
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname
  },
  rules: {
    '@typescript-eslint/unbound-method': 'off',
    '@typescript-eslint/no-base-to-string': 'off',
    '@typescript-eslint/restrict-template-expressions': 'off'
  }
}
