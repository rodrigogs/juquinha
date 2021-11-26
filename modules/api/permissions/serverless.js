/* eslint-disable import/no-commonjs, import/no-commonjs */
const { APP_PREFIX } = require('config/env')
const RecipeBuilder = require('lib/helpers/recipe-builder')

module.exports = new RecipeBuilder()
  .forApi()
  .setService(`${APP_PREFIX}-api-permissions`)
  .setProvider({
    runtime: 'nodejs14.x',
    memorySize: 1024,
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
              'arn:aws:dynamodb:${self:custom.region}:*:table/${self:custom.appPrefix}-${self:custom.stage}-roles-*',
              'arn:aws:dynamodb:${self:custom.region}:*:table/${self:custom.appPrefix}-${self:custom.stage}-permissions-*',
              'arn:aws:dynamodb:${self:custom.region}:*:table/${self:custom.appPrefix}-${self:custom.stage}-role-permissions-*',
            ],
          },
        ],
      },
    },
    environment: {
      ROLES_TABLE_NAME: '${self:custom.rolesTableName}',
      PERMISSIONS_TABLE_NAME: '${self:custom.permissionsTableName}',
      ROLE_PERMISSIONS_TABLE_NAME: '${self:custom.rolePermissionsTableName}',
    },
  })
  .addPlugin('serverless-bundle')
  .setPackage({ individually: true })
  .setCustom('rolesTableName', '${self:custom.appPrefix}-${self:provider.stage}-roles-table')
  .setCustom('permissionsTableName', '${self:custom.appPrefix}-${self:provider.stage}-permissions-table')
  .setCustom('rolePermissionsTableName', '${self:custom.appPrefix}-${self:provider.stage}-role-permissions-table')
  .addFunction('get', {
    handler: 'get.handler',
    events: [
      {
        http: {
          method: 'get',
          path: '/permissions',
          cors: true,
        },
      },
      {
        http: {
          method: 'get',
          path: '/permissions/{id}',
          cors: true,
        },
      },
      {
        http: {
          method: 'get',
          path: '/permissions/{id}/roles',
          cors: true,
        },
      },
    ],
  })
  .addFunction('post', {
    handler: 'post.handler',
    events: [
      {
        http: {
          method: 'post',
          path: '/permissions',
          cors: true,
        },
      },
      {
        http: {
          method: 'post',
          path: '/permissions/{id}/roles',
          cors: true,
        },
      },
    ],
  })
  .addFunction('put', {
    handler: 'put.handler',
    events: [
      {
        http: {
          method: 'put',
          path: '/permissions/{id}',
          cors: true,
        },
      },
    ],
  })
  .addFunction('delete', {
    handler: 'delete.handler',
    events: [
      {
        http: {
          method: 'delete',
          path: '/permissions/{id}',
          cors: true,
        },
      },
      {
        http: {
          method: 'delete',
          path: '/permissions/{id}/roles/{roleId}',
          cors: true,
        },
      },
    ],
  })
  .build()
