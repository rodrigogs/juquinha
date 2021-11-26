/* eslint-disable import/no-commonjs, import/no-commonjs */
const { APP_PREFIX } = require('config/env')
const RecipeBuilder = require('lib/helpers/recipe-builder')

module.exports = new RecipeBuilder()
  .forApi()
  .setService(`${APP_PREFIX}-api-roles`)
  .setProvider({
    runtime: 'nodejs14.x',
    memorySize: 256,
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
              'arn:aws:dynamodb:${self:custom.region}:*:table/${self:custom.appPrefix}-${self:custom.stage}-permissions-*',
              'arn:aws:dynamodb:${self:custom.region}:*:table/${self:custom.appPrefix}-${self:custom.stage}-user-roles-*',
              'arn:aws:dynamodb:${self:custom.region}:*:table/${self:custom.appPrefix}-${self:custom.stage}-role-permissions-*',
            ],
          },
        ],
      },
    },
    environment: {
      USERS_TABLE_NAME: '${self:custom.usersTableName}',
      ROLES_TABLE_NAME: '${self:custom.rolesTableName}',
      PERMISSIONS_TABLE_NAME: '${self:custom.permissionsTableName}',
      USER_ROLES_TABLE_NAME: '${self:custom.userRolesTableName}',
      ROLE_PERMISSIONS_TABLE_NAME: '${self:custom.rolePermissionsTableName}',
    },
  })
  .addPlugin('serverless-bundle')
  .setPackage({ individually: true })
  .setCustom('usersTableName', '${self:custom.appPrefix}-${self:provider.stage}-users-table')
  .setCustom('rolesTableName', '${self:custom.appPrefix}-${self:provider.stage}-roles-table')
  .setCustom('permissionsTableName', '${self:custom.appPrefix}-${self:provider.stage}-permissions-table')
  .setCustom('userRolesTableName', '${self:custom.appPrefix}-${self:provider.stage}-user-roles-table')
  .setCustom('rolePermissionsTableName', '${self:custom.appPrefix}-${self:provider.stage}-role-permissions-table')
  .addFunction('get', {
    handler: 'get.handler',
    events: [
      {
        http: {
          method: 'get',
          path: '/roles',
          cors: true,
        },
      },
      {
        http: {
          method: 'get',
          path: '/roles/{id}',
          cors: true,
        },
      },
      {
        http: {
          method: 'get',
          path: '/roles/{id}/users',
          cors: true,
        },
      },
      {
        http: {
          method: 'get',
          path: '/roles/{id}/permissions',
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
          path: '/roles',
          cors: true,
        },
      },
      {
        http: {
          method: 'post',
          path: '/roles/{id}/users',
          cors: true,
        },
      },
      {
        http: {
          method: 'post',
          path: '/roles/{id}/permissions',
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
          path: '/roles/{id}',
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
          path: '/roles/{id}',
          cors: true,
        },
      },
      {
        http: {
          method: 'delete',
          path: '/roles/{id}/users/{userId}',
          cors: true,
        },
      },
      {
        http: {
          method: 'delete',
          path: '/roles/{id}/permissions/{permissionId}',
          cors: true,
        },
      },
    ],
  })
  .build()
