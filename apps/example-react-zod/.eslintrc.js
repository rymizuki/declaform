/** @type {import('eslint').Linter.Config} */
module.exports = {
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname
  },
  rules: {
    '@typescript-eslint/ban-types': 'off'
  }
}
