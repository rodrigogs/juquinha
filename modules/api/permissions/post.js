import PermissionsService from 'lib/services/permissions'
import createRolePermission from 'lib/services/role-permissions/create'
import { default as Router, responseBuilder } from 'lib/helpers/router'

export const handler = async (event, context) => {
  return await new Router(event, context)

    .post('/permissions', (request) => {
      const { body } = request
      return PermissionsService.create(body).then((createdPermission) =>
        responseBuilder.success.created({ body: createdPermission }),
      )
    })

    .post('/permissions/:id/roles', (request) => {
      const { pathParameters, body } = request
      return createRolePermission({
        permissionId: pathParameters.id,
        roleId: body.roleId,
      }).then((createdRolePermission) =>
        responseBuilder.success.created({ body: createdRolePermission }),
      )
    })

    .dispatch()
}
