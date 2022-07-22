import resolveStage from '../helpers/resolve-stage.mjs'
import ensureAWSCredentials from './ensure-aws-credentials.mjs'
import ensureServerlessSettings from './ensure-serverless-credentials.mjs'
import ensureAppSettings from './ensure-app-settings.mjs'

export default async () => {
  // eslint-disable-next-line no-process-env
  let env = { ...process.env }
  env = await resolveStage(env)
  env = await ensureAWSCredentials(env)
  env = await ensureServerlessSettings(env)
  env = await ensureAppSettings(env)
  return env
}
