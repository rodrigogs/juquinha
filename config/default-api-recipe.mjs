export default {
  package: { individually: true },
  plugins: ['serverless-bundle'],
  provider: {
    apiGateway: {
      restApiId: {
        'Fn::ImportValue': '${self:custom.appPrefix}-${self:custom.stage}-api-id',
      },
      restApiRootResourceId: {
        'Fn::ImportValue': '${self:custom.appPrefix}-${self:custom.stage}-api-root-resource-id',
      },
    },
  },
}
