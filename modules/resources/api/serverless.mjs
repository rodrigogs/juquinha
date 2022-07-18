import { APP_PREFIX, DOMAIN_NAME } from '@juquinha/config/env.mjs'
import RecipeBuilder from '@juquinha/lib/helpers/recipe-builder.mjs'

// eslint-disable-next-line no-process-env
const shouldCreateDomain = String(process.env.INIT).toLowerCase() === 'true' && DOMAIN_NAME.length > 0
const plugins = ['serverless-scriptable-plugin', 'serverless-bundle']
if (DOMAIN_NAME.length > 0) plugins.push('serverless-domain-manager')

export default new RecipeBuilder()
  .setService(`${APP_PREFIX}-resources-api`)
  .setMemorySize(128)
  .addPlugins(plugins)
  .setCustom('customDomain', {
    domainName: DOMAIN_NAME,
    basePath: '${self:provider.stage}',
    stage: '${self:provider.stage}',
    certificateName: `*.${DOMAIN_NAME}`,
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
