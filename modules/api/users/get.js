import UsersService from '@juquinha/lib/services/users'
import UserRolesService from '@juquinha/lib/services/user-roles'
import { default as Router, responseBuilder } from '@juquinha/lib/helpers/router'

export const handler = async (event, context) => {
  return await new Router(event, context)

    .get('/users', (request) => {
      const { queryStringParameters } = request
      const { limit, lastKey, filter } = queryStringParameters
      return UsersService.list({ filter, lastKey, limit }).then((page) =>
        responseBuilder.success.ok({ body: page }),
      )
    })

    .get('/users/id/:id', (request) => {
      const { pathParameters } = request
      return UsersService.getOneById(pathParameters.id).then((user) =>
        user
          ? responseBuilder.success.ok({ body: user })
          : responseBuilder.errors.notFound('User not found'),
      )
    })

    .get('/users/username/:username', (request) => {
      const { pathParameters } = request
      return UsersService.getOneByUsername(pathParameters.username).then((user) =>
        user
          ? responseBuilder.success.ok({ body: user })
          : responseBuilder.errors.notFound('User not found'),
      )
    })

    .get('/users/:id/roles', (request) => {
      const { pathParameters, queryStringParameters } = request
      const { limit, lastKey } = queryStringParameters
      return UserRolesService.listRolesByUserId(pathParameters.id, {
        lastKey,
        limit,
      }).then((roles) => responseBuilder.success.ok({ body: roles }))
    })

    .dispatch()
}
