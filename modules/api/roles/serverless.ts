import { APP_PREFIX } from 'config/env'
import RecipeBuilder from 'lib/helpers/recipe-builder'

module.exports = new RecipeBuilder()
  .forApi()
  .setService(`${APP_PREFIX}-api-roles`)
  .setMemorySize(256)
  .usesDynamoTable('users')
  .usesDynamoTable('roles')
  .usesDynamoTable('permissions')
  .usesDynamoTable('user-roles')
  .usesDynamoTable('role-permissions')
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
