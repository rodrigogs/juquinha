import { APP_PREFIX } from '@juquinha/config/env.mjs'
import RecipeBuilder from '@juquinha/lib/helpers/recipe-builder.mjs'

export default new RecipeBuilder()
  .forApi()
  .setService(`${APP_PREFIX}-api-users`)
  .setMemorySize(1024)
  .usesDynamoTable('users')
  .usesDynamoTable('roles')
  .usesDynamoTable('user-roles')
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
