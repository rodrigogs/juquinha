/* eslint-disable import/no-commonjs, import/no-commonjs */
const { APP_PREFIX } = require('config/env')
const RecipeBuilder = require('lib/helpers/recipe-builder')

const domainName = '' // <- Your api domain name goes here, like: 'api.example.com'

const shouldCreateDomain =
  // eslint-disable-next-line no-process-env
  String(process.env.INIT).toLowerCase() === 'true' && domainName.length > 0
const plugins = ['serverless-scriptable-plugin', 'serverless-bundle']
if (domainName.length > 0) plugins.push('serverless-domain-manager')

module.exports = new RecipeBuilder()
  .setService(`${APP_PREFIX}-resources-api`)
  .setMemorySize(128)
  .addPlugins(plugins)
  .setCustom('customDomain', {
    domainName,
    basePath: '${self:provider.stage}',
    stage: '${self:provider.stage}',
    certificateName: '*.my-domain.com',
    createRoute53Record: true,
  })
  .setCustom('scriptHooks', {
    'before:deploy:deploy': shouldCreateDomain ? [`cd ${__dirname}`, 'sls create_domain'] : [], // Create a hosted zone ex.: 'api.mydomain.com' before running this
  // 'after:remove:remove': ['sls delete_domain'],
  })
  .addFunction('healthcheck', {
    handler: 'healthcheck.handler',
    fileSystemConfig: undefined,
    events: [
      {
        http: {
          method: 'get',
          path: '/',
          cors: true,
        },
      },
    ],
  })
  .addResource('GatewayResponseDefault4XX', {
    Type: 'AWS::ApiGateway::GatewayResponse',
    Properties: {
      ResponseParameters: {
        'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
        'gatewayresponse.header.Access-Control-Allow-Headers': "'*'",
      },
      ResponseType: 'DEFAULT_4XX',
      RestApiId: {
        Ref: 'ApiGatewayRestApi',
      },
    },
  })
  .addResource('GatewayResponseDefault5XX', {
    Type: 'AWS::ApiGateway::GatewayResponse',
    Properties: {
      ResponseParameters: {
        'gatewayresponse.header.Access-Control-Allow-Origin': "'*'",
        'gatewayresponse.header.Access-Control-Allow-Headers': "'*'",
      },
      ResponseType: 'DEFAULT_5XX',
      RestApiId: {
        Ref: 'ApiGatewayRestApi',
      },
    },
  })
  .addResource('ApiGatewayRestApi', {
    Type: 'AWS::ApiGateway::RestApi',
    Properties: {
      Name: `${APP_PREFIX}-resources-api`,
      Description: 'Resources API',
      EndpointConfiguration: {
        Types: ['EDGE'],
      },
    },
  })
  .addOutput('ApiId', {
    Description: 'API Gateway ID',
    Value: {
      Ref: 'ApiGatewayRestApi',
    },
    Export: {
      Name: '${self:custom.appPrefix}-${self:custom.stage}-api-id',
    },
  })
  .addOutput('ApiRootResourceId', {
    Description: 'API Gateway Resource ID',
    Value: {
      'Fn::GetAtt': ['ApiGatewayRestApi', 'RootResourceId'],
    },
    Export: {
      Name: '${self:custom.appPrefix}-${self:custom.stage}-api-root-resource-id',
    },
  })
  .build()
