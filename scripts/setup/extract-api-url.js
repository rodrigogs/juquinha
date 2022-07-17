const { STAGE } = require('@juquinha/config/env')
const resolveDotenvFilePath = require('@juquinha/config/resolve-dotenv-file-path')
const writeDotenv = require('@juquinha/config/write-dotenv')
const resolveDotenv = require('@juquinha/config/resolve-dotenv')

module.exports = ({ output: string }) => {
  const match = string.match(/https:\/\/[a-z0-9].+([\\-\\.]amazonaws+)\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?/g)
  if (!match) return null

  const dotenvFilePath = resolveDotenvFilePath(STAGE)
  writeDotenv(dotenvFilePath, {
    API_URL: match[0],
  })
  resolveDotenv(STAGE)
  return match[0]
}
