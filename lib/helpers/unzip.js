/* eslint-disable import/no-commonjs */
const fs = require('fs')
const unzipper = require('unzipper')

module.exports = async (zipFilePath, outputPath) => await fs
  .createReadStream(zipFilePath)
  .pipe(unzipper.Extract({ path: outputPath }))
