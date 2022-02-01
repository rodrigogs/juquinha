/* eslint-disable import/no-commonjs */
const AdmZip = require('adm-zip')

module.exports = (zipFilePath, outputPath) => {
  const zip = new AdmZip(zipFilePath)
  zip.extractAllTo(outputPath, true)
}
