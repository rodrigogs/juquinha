const { APP_PREFIX } = require('@juquinha/config/env')
const RecipeBuilder = require('@juquinha/lib/helpers/recipe-builder')

module.exports = new RecipeBuilder()
  .forApi()
  .setService(`${APP_PREFIX}-api-permissions`)
  .setMemorySize(1024)
  .usesDynamoTable('roles')
  .usesDynamoTable('permissions')
  .usesDynamoTable('role-permissions')
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
