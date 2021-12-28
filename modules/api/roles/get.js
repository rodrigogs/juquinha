import listRoles from 'lib/services/roles/list'
import listRoleUsersByRoleId from 'lib/services/user-roles/list-users-by-role-id'
import listRolePermissionsByRoleId from 'lib/services/role-permissions/list-permissions-by-role-id'
import getOneRoleById from 'lib/services/roles/get-one-by-id'
import { default as Router, responseBuilder } from 'lib/helpers/router'

export const handler = async (event, context) => {
  return await new Router(event, context)

    .get('/roles', (request) => {
      const { queryStringParameters } = request
      const { limit, lastKey, filter } = queryStringParameters
      return listRoles({ filter, lastKey, limit }).then((page) =>
        responseBuilder.success.ok({ body: page }),
      )
    })

    .get('/roles/:id/users', (request) => {
      const { pathParameters, queryStringParameters } = request
      const { limit, lastKey } = queryStringParameters
      return listRoleUsersByRoleId(pathParameters.id, {
        lastKey,
        limit,
      }).then((users) => responseBuilder.success.ok({ body: users }))
    })

    .get('/roles/:id/permissions', (request) => {
      const { pathParameters, queryStringParameters } = request
      const { limit, lastKey: lastKeyRaw } = queryStringParameters
      const lastKey = lastKeyRaw
        ? JSON.parse(Buffer.from(lastKeyRaw, 'base64').toString())
        : undefined
      return listRolePermissionsByRoleId(pathParameters.id, {
        lastKey,
        limit,
      }).then((permissions) => responseBuilder.success.ok({ body: permissions }))
    })

    .get('/roles/:id', (request) => {
      const { pathParameters } = request
      return getOneRoleById(pathParameters.id).then((role) =>
        role
          ? responseBuilder.success.ok({ body: role })
          : responseBuilder.errors.notFound('Role not found'),
      )
    })

    .dispatch()
}
