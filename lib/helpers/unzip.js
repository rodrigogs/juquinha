/* eslint-disable import/no-commonjs */
const extractZip = require('extract-zip')

module.exports = async (zipFilePath, outputPath) => {
  try {
    await extractZip(zipFilePath, { dir: outputPath })
  } catch (err) {
    throw new Error(`Unable to extract zip file [${zipFilePath}] to [${outputPath}]`)
  }
}
