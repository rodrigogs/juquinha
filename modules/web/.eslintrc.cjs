module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
  ],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
  },
  globals: {
    'defineNuxtPlugin': true,
  },
}
