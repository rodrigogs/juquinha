/* eslint-disable no-process-env */
const dotenv = require('dotenv')
const resolveDotenvFilePath = require('./resolve-dotenv-file-path')

module.exports = (stage = process.env.STAGE) => {
  const isInit = (process.env.INIT || '').toLowerCase() === 'true'
  stage = (stage || (isInit ? '' : 'dev')).toLowerCase()

  let environment = { ...process.env, stage }
  let filePath
  let parsed
  let error

  if (stage) {
    try {
      filePath = resolveDotenvFilePath(stage)
      ;({ parsed, error } = dotenv.config({ path: filePath }))
      environment = { ...environment, ...parsed }
      // Populates process.env from environment
      Object.keys(environment).forEach(key => {
        process.env[key] = environment[key]
      })
    } catch (ignore) {
    }
  }

  return { environment, error, filePath }
}
