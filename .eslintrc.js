module.exports = {
  root: true,
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    'standard',
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
  },
  rules: {
    'no-process-env': ['error'],
    'comma-dangle': ['error', 'always-multiline'],
    'no-template-curly-in-string': 'off',
    'import/no-named-default': 'off',
  },
  globals: {
    afterEach: true,
    expect: true,
    process: true,
    describe: true,
    before: true,
    after: true,
    beforeEach: true,
    suite: true,
    test: true,
    it: true,
  },
}
