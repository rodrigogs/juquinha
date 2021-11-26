/* eslint-disable import/no-commonjs */
const execa = require('execa')

module.exports = (script) => execa('npm', ['run', script])
