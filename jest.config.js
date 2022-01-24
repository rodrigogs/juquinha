// eslint-disable-next-line import/no-commonjs
module.exports = {
  testEnvironment: 'node',
  testMatch: [
    '**/?(*.)+(spec).js',
  ],
  testPathIgnorePatterns: [
    'modules/web',
  ],
  setupFiles: [
    'lib/helpers/jest-helpers.js',
  ],
  testTimeout: 20000,
}
