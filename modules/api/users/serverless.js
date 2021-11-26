/* eslint-disable import/no-commonjs, import/no-commonjs */
const { APP_PREFIX } = require('config/env')
const RecipeBuilder = require('lib/helpers/recipe-builder')

module.exports = new RecipeBuilder()
  .forApi()
  .setService(`${APP_PREFIX}-api-users`)
  .setProvider({
    runtime: 'nodejs14.x',
    memorySize: 1024,
    timeout: 20,
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
              'arn:aws:dynamodb:${self:custom.region}:*:table/${self:custom.appPrefix}-${self:custom.stage}-users-*',
              'arn:aws:dynamodb:${self:custom.region}:*:table/${self:custom.appPrefix}-${self:custom.stage}-roles-*',
              'arn:aws:dynamodb:${self:custom.region}:*:table/${self:custom.appPrefix}-${self:custom.stage}-user-roles-*',
            ],
          },
        ],
      },
    },
    environment: {
      USERS_TABLE_NAME: '${self:custom.usersTableName}',
      ROLES_TABLE_NAME: '${self:custom.rolesTableName}',
      USER_ROLES_TABLE_NAME: '${self:custom.userRolesTableName}',
    },
  })
  .addPlugin('serverless-bundle')
  .setPackage({ individually: true })
  .setCustom('usersTableName', '${self:custom.appPrefix}-${self:provider.stage}-users-table')
  .setCustom('rolesTableName', '${self:custom.appPrefix}-${self:provider.stage}-roles-table')
  .setCustom('userRolesTableName', '${self:custom.appPrefix}-${self:provider.stage}-user-roles-table')
  .addFunction('get', {
    handler: 'get.handler',
    events: [
      {
        http: {
          method: 'get',
          path: '/users',
          cors: true,
        },
      },
      {
        http: {
          method: 'get',
          path: '/users/id/{id}',
          cors: true,
        },
      },
      {
        http: {
          method: 'get',
          path: '/users/username/{username}',
          cors: true,
        },
      },
      {
        http: {
          method: 'get',
          path: '/users/{id}/roles',
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
          path: '/users',
          cors: true,
        },
      },
      {
        http: {
          method: 'post',
          path: '/users/{id}/roles',
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
          path: '/users/{id}',
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
          path: '/users/{id}',
          cors: true,
        },
      },
      {
        http: {
          method: 'delete',
          path: '/users/{id}/roles/{roleId}',
          cors: true,
        },
      },
    ],
  })
  .build()
