import PermissionsService from '@juquinha/lib/services/permissions'
import createRolePermission from '@juquinha/lib/services/role-permissions/create'
import { default as Router, responseBuilder } from '@juquinha/lib/helpers/router'

export const handler = async (event, context) => {
  return await new Router(event, context)

    .put('/permissions/:id', (request) => {
      const { pathParameters, body } = request
      return PermissionsService.update(pathParameters.id, body).then(async () => {
        const updatedPermission = await PermissionsService.getOneById(pathParameters.id)
        return responseBuilder.success.ok({ body: updatedPermission })
      })
    })

    .put('/permissions/:id/roles/:roleId', (request) => {
      const { pathParameters } = request
      return createRolePermission({
        permissionId: pathParameters.id,
        roleId: pathParameters.roleId,
      }).then((updatedPermissionRole) =>
        responseBuilder.success.ok({ body: updatedPermissionRole }),
      )
    })

    .dispatch()
}
