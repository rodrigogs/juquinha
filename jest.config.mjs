export default {
  testEnvironment: 'node',
  testMatch: [
    '**/?(*.)+(unit|integration).spec.((m|c)?js|ts)',
  ],
  testPathIgnorePatterns: [
    'modules/web',
  ],
  setupFiles: [
    '<rootDir>/tests/jest-helpers.mjs',
  ],
  testTimeout: 20000,
  fakeTimers: {},
  transform: {},
}
