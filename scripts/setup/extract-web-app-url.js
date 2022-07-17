const { STAGE } = require('@juquinha/config/env')
const resolveDotenvFilePath = require('@juquinha/config/resolve-dotenv-file-path')
const writeDotenv = require('@juquinha/config/write-dotenv')
const resolveDotenv = require('@juquinha/config/resolve-dotenv')
const stripAnsi = require('strip-ansi')

module.exports = ({ output: string }) => {
  const normalizedString = stripAnsi(string)
  const separator = 'Success! Your site should be available at '
  const line = normalizedString
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
