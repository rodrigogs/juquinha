import { STAGE } from '@juquinha/config/env.mjs'
import resolveDotenvFilePath from '@juquinha/config/resolve-dotenv-file-path.mjs'
import writeDotenv from '@juquinha/config/write-dotenv.mjs'
import resolveDotenv from '@juquinha/config/resolve-dotenv.mjs'
import stripAnsi from 'strip-ansi'

export default ({ output: string }) => {
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
