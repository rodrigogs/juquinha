import { APP_PREFIX, WEB_APP_BUCKET_NAME } from '@juquinha/config/env.mjs'
import RecipeBuilder from '@juquinha/lib/helpers/recipe-builder.mjs'
import __dirname from './__dirname.cjs'

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
    'after:deploy:finalize': [`(cd ${__dirname} && npx cross-env NO_CONFIRM=true sls client deploy)`],
    'before:remove:remove': [`(cd ${__dirname} && npx cross-env NO_CONFIRM=true sls client remove)`],
  })
  .addResource('DummyCloudWatchLogGroup', {
    Type: 'AWS::Logs::LogGroup',
    Properties: {
      LogGroupName: `\${self:custom.appPrefix}-web-\${self:custom.stage}`,
      RetentionInDays: 1,
    },
  })
  .build()
