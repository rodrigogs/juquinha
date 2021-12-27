const fs = require('fs')
const dotenv = require('dotenv')

// Write object to .env file
module.exports = (envFilePath, envObject) => {
  // If envFilePath does not exist, create it
  if (!fs.existsSync(envFilePath)) {
    fs.writeFileSync(envFilePath, '')
  }

  const { parsed, error } = dotenv.config({ path: envFilePath })
  if (error) throw new Error(`Error loading ${envFilePath} file: ${error}`)

  // Merge new object with existing .env file
  const merged = Object.assign({}, parsed, envObject)

  // Write object to .env file using fs
  const envString = Object.keys(merged).map(key => `${key}=${merged[key]}`).join('\n')
  fs.writeFileSync(envFilePath, envString)
}
