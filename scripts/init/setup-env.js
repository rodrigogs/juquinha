const resolveStage = require('./resolve-stage')
const ensureAWSCredentials = require('./ensure-aws-credentials')
const ensureServerlessSettings = require('./ensure-serverless-credentials')
const ensureAppSettings = require('./ensure-app-settings')

module.exports = async () => {
  // eslint-disable-next-line no-process-env
  let env = { ...process.env }
  env = await resolveStage(env)
  env = await ensureAWSCredentials(env)
  env = await ensureServerlessSettings(env)
  env = await ensureAppSettings(env)
  return env
}
