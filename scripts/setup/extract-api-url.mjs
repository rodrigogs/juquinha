import { STAGE } from '@juquinha/config/env.mjs'
import resolveDotenvFilePath from '@juquinha/config/resolve-dotenv-file-path.mjs'
import writeDotenv from '@juquinha/config/write-dotenv.mjs'
import resolveDotenv from '@juquinha/config/resolve-dotenv.mjs'

export default ({ output: string }) => {
  const match = string.match(/https:\/\/[a-z0-9].+([\\-\\.]amazonaws+)\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?/g)
  if (!match) return null

  const dotenvFilePath = resolveDotenvFilePath(STAGE)
  writeDotenv(dotenvFilePath, {
    API_URL: match[0],
  })
  resolveDotenv(STAGE)
  return match[0]
}
