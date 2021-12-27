const { APP_PREFIX, WEB_APP_BUCKET_NAME } = require('config/env')
const RecipeBuilder = require('lib/helpers/recipe-builder')

module.exports = new RecipeBuilder()
  .setService(`${APP_PREFIX}-web`)
  .addPlugin('@rodrigogs/serverless-finch')
  .addPlugin('serverless-scriptable-plugin')
  .setCustom('client', {
    bucketName: WEB_APP_BUCKET_NAME,
    distributionFolder: 'dist',
  })
  .setCustom('scriptHooks', {
    'before:package:createDeploymentArtifacts': [`npm run build`],
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
