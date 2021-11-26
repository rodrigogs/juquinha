/* eslint-disable import/no-commonjs */
const {
  name: rootPackageName,
  devDependencies: { serverless: serverlessVersion },
} = require('../package.json')
const { ORG_NAME, APP_PREFIX, STAGE, REGION, DEPLOYMENT_BUCKET_NAME } = require('./env')

module.exports = Object.freeze({
  org: ORG_NAME,
  app: rootPackageName,
  deprecationNotificationMode: 'error',
  frameworkVersion: serverlessVersion,
  plugins: ['serverless-offline'],
  custom: {
    appPrefix: APP_PREFIX,
    stage: STAGE,
    region: REGION,
    bundle: {
      // forceExclude: [
      //   '@discordjs/opus',
      //   'bufferutil',
      //   'discord.js',
      //   'erlpack',
      //   'utf-8-validate',
      //   'zlib-sync',
      // ],
      // fixPackages: ['formidable@1.x'], // @see https://github.com/AnomalyInnovations/serverless-bundle/pull/72#issuecomment-612669367
      sourcemaps: STAGE === 'dev',
    },
    accessLogsTableName: `${APP_PREFIX}-\${self:provider.stage}-access-logs-table`,
  },
  provider: {
    name: 'aws',
    stage: STAGE,
    region: REGION,
    logRetentionInDays: 5,
    lambdaHashingVersion: '20201221',
    apiGateway: { shouldStartNameWithService: true },
    deploymentBucket: {
      name: DEPLOYMENT_BUCKET_NAME,
      maxPreviousDeploymentArtifacts: 10,
      blockPublicAccess: true,
    },
    versionFunctions: false,
    iam: {
      role: {
        statements: [
          {
            Effect: 'Allow',
            Action: ['logs:*'],
            Resource: '*',
          },
          {
            Effect: 'Allow',
            Action: ['dynamodb:*'],
            Resource: [
              'arn:aws:dynamodb:${self:custom.region}:*:table/${self:custom.appPrefix}-${self:custom.stage}-access-logs-*',
            ],
          },
        ],
        // managedPolicies: ['arn:aws:iam::aws:policy/AmazonElasticFileSystemClientReadWriteAccess'],
      },
    },
    environment: {
      APP_NAME: '${self:app}',
      APP_PREFIX: '${self:custom.appPrefix}',
      SERVICE_NAME: '${self:service}',
      STAGE: '${self:custom.stage}',
      REGION: '${self:custom.region}',
      ACCESS_LOGS_TABLE_NAME: '${self:custom.accessLogsTableName}',
    },
  },
})
