const rootConfig = require('@juquinha/config/eslint-root-config')
const deepmerge = require('deepmerge')

module.exports = deepmerge(rootConfig, {
  parserOptions: {
    sourceType: 'script',
  },
  rules: {
    'import/no-commonjs': 'off',
    'node/exports-style': ['error', 'module.exports'],
  },
})
