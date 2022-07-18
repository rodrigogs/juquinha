import { STAGE, APP_PREFIX, WEB_APP_BUCKET_NAME } from '@juquinha/config/env.mjs'
import RecipeBuilder from '@juquinha/lib/helpers/recipe-builder.mjs'
import path from 'path'
import * as url from 'url'

const __dirname = url.fileURLToPath(new URL('.', import.meta.url))
const rootDir = path.resolve(__dirname, '..', '..')
const dotenvFile = `"${STAGE === 'dev' ? '.env' : path.join(rootDir, `.env.${STAGE}`)}"`

export default new RecipeBuilder()
  .setService(`${APP_PREFIX}-web`)
  .addPlugin('@rodrigogs/serverless-finch')
  .addPlugin('serverless-scriptable-plugin')
  .setCustom('client', {
    bucketName: WEB_APP_BUCKET_NAME,
    distributionFolder: 'dist',
  })
  .setCustom('scriptHooks', {
    'before:package:createDeploymentArtifacts': [`npx pnpm run build`],
    'after:deploy:finalize': [`(cd ${__dirname} && npx cross-env NO_CONFIRM=true STAGE=${STAGE} npx dotenv -f ${dotenvFile} sls client deploy)`],
    'before:remove:remove': [`(cd ${__dirname} && npx cross-env NO_CONFIRM=true STAGE=${STAGE} npx dotenv -f ${dotenvFile} sls client remove)`],
  })
  .addResource('DummyCloudWatchLogGroup', {
    Type: 'AWS::Logs::LogGroup',
    Properties: {
      LogGroupName: `\${self:custom.appPrefix}-web-\${self:custom.stage}`,
      RetentionInDays: 1,
    },
  })
  .build()
