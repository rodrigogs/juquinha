import listPermissions from 'lib/services/permissions/list'
import listRolePermissionsByPermissionId from 'lib/services/role-permissions/list-roles-by-permission-id'
import getOnePermissionById from 'lib/services/permissions/get-one-by-id'
import { default as Router, responseBuilder } from 'lib/helpers/router'

export const handler = async (event, context) => {
  return await new Router(event, context)

    .get('/permissions', (request) => {
      const { queryStringParameters } = request
      const { limit, lastKey: lastKeyRaw, filter } = queryStringParameters
      const lastKey = lastKeyRaw
        ? JSON.parse(Buffer.from(lastKeyRaw, 'base64').toString())
        : undefined
      return listPermissions({ filter, lastKey, limit }).then((permissions) =>
        responseBuilder.success.ok({ body: permissions }),
      )
    })

    .get('/permissions/:id', (request) => {
      const { pathParameters } = request
      return getOnePermissionById(pathParameters.id).then((permission) =>
        permission
          ? responseBuilder.success.ok({ body: permission })
          : responseBuilder.errors.notFound('Permission not found'),
      )
    })

    .get('/permissions/:id/roles', (request) => {
      const { pathParameters, queryStringParameters } = request
      const { limit, lastKey: lastKeyRaw } = queryStringParameters
      const lastKey = lastKeyRaw
        ? JSON.parse(Buffer.from(lastKeyRaw, 'base64').toString())
        : undefined
      return listRolePermissionsByPermissionId(pathParameters.id, {
        lastKey,
        limit,
      }).then((permissions) => responseBuilder.success.ok({ body: permissions }))
    })

    .dispatch()
}
