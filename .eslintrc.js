const config = require('@declaform/dev-config/eslint')
config.root = true

/** @type {import('eslint').Linter.Config} */
module.exports = {
  ...config,
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname
  }
}
