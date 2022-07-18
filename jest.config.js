// eslint-disable-next-line import/no-commonjs
module.exports = {
  testEnvironment: 'node',
  testMatch: [
    '**/?(*.)+(spec|unit|integration).((m|c)?js|ts)',
  ],
  testPathIgnorePatterns: [
    'modules/web',
  ],
  setupFiles: [
    '<rootDir>/tests/jest-helpers.js',
  ],
  testTimeout: 20000,
  timers: 'fake',
  presets: [
    [
      '@babel/preset-env',
    ],
  ],
}
