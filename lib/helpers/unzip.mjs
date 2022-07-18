import AdmZip from 'adm-zip'

export default (zipFilePath, outputPath) => {
  const zip = new AdmZip(zipFilePath)
  zip.extractAllTo(outputPath, true)
}
