import getOneUserById from 'lib/services/users/get-one-by-id'
import getOneUserByUsername from 'lib/services/users/get-one-by-username'
import listUsers from 'lib/services/users/list'
import listRolesByUserId from 'lib/services/user-roles/list-roles-by-user-id'
import { default as Router, responseBuilder } from 'lib/helpers/router'

export const handler = async (event, context) => {
  return await new Router(event, context)

    .get('/users', (request) => {
      const { queryStringParameters } = request
      const { limit, lastKey: lastKeyRaw, filter } = queryStringParameters
      const lastKey = lastKeyRaw
        ? JSON.parse(Buffer.from(lastKeyRaw, 'base64').toString())
        : undefined
      return listUsers({ filter, lastKey, limit }).then((page) =>
        responseBuilder.success.ok({ body: page }),
      )
    })

    .get('/users/id/:id', (request) => {
      const { pathParameters } = request
      return getOneUserById(pathParameters.id).then((user) =>
        user
          ? responseBuilder.success.ok({ body: user })
          : responseBuilder.errors.notFound('User not found'),
      )
    })

    .get('/users/username/:username', (request) => {
      const { pathParameters } = request
      return getOneUserByUsername(pathParameters.username).then((user) =>
        user
          ? responseBuilder.success.ok({ body: user })
          : responseBuilder.errors.notFound('User not found'),
      )
    })

    .get('/users/:id/roles', (request) => {
      const { pathParameters, queryStringParameters } = request
      const { limit, lastKey: lastKeyRaw } = queryStringParameters
      const lastKey = lastKeyRaw
        ? JSON.parse(Buffer.from(lastKeyRaw, 'base64').toString())
        : undefined
      return listRolesByUserId(pathParameters.id, {
        lastKey,
        limit,
      }).then((roles) => responseBuilder.success.ok({ body: roles }))
    })

    .dispatch()
}
