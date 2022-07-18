import PermissionsService from '@juquinha/lib/services/permissions'
import RolePermissionsService from '@juquinha/lib/services/role-permissions'

import { default as Router, responseBuilder } from '@juquinha/lib/helpers/router/index.mjs'

export const handler = async (event, context) => {
  return await new Router(event, context)

    .get('/permissions', (request) => {
      const { queryStringParameters } = request
      const { limit, lastKey, nameContains } = queryStringParameters
      return PermissionsService.list({ nameContains, lastKey, limit }).then((permissions) =>
        responseBuilder.success.ok({ body: permissions }),
      )
    })

    .get('/permissions/:id', (request) => {
      const { pathParameters } = request
      return PermissionsService.getOneById(pathParameters.id).then((permission) =>
        permission
          ? responseBuilder.success.ok({ body: permission })
          : responseBuilder.errors.notFound('Permission not found'),
      )
    })

    .get('/permissions/:id/roles', (request) => {
      const { pathParameters, queryStringParameters } = request
      const { limit, lastKey } = queryStringParameters
      return RolePermissionsService.listRolesByPermissionId(pathParameters.id, {
        lastKey,
        limit,
      }).then((permissions) => responseBuilder.success.ok({ body: permissions }))
    })

    .dispatch()
}
