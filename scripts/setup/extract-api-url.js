const { STAGE } = require('config/env')
const resolveDotenvFilePath = require('config/resolve-dotenv-file-path')
const writeDotenv = require('config/write-dotenv')
const resolveDotenv = require('config/resolve-dotenv')

module.exports = (string) => {
  const match = string.match(/https:\/\/[a-z0-9].+([\\-\\.]amazonaws+)\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?/g)
  if (!match) return null

  const dotenvFilePath = resolveDotenvFilePath(STAGE)
  writeDotenv(dotenvFilePath, {
    API_URL: match[0],
  })
  resolveDotenv(STAGE)
  return match[0]
}
