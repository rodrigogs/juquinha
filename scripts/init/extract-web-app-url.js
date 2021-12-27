const { STAGE } = require('config/env')
const resolveDotenvFilePath = require('config/resolve-dotenv-file-path')
const writeDotenv = require('config/write-dotenv')
const resolveDotenv = require('config/resolve-dotenv')

module.exports = (string) => {
  const separator = 'Serverless: Success! Your site should be available at '
  const line = string
    .split('\n')
    .find((line) => line.startsWith(separator))
  if (!line) return null

  const webAppUrl = line.substring(separator.length)
  const dotenvFilePath = resolveDotenvFilePath(STAGE)
  writeDotenv(dotenvFilePath, {
    APP_URL: webAppUrl,
  })
  resolveDotenv(STAGE)
  return webAppUrl
}
