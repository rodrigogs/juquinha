import createRole from 'lib/services/roles/create'
import createUserRole from 'lib/services/user-roles/create'
import createRolePermission from 'lib/services/role-permissions/create'
import { default as Router, responseBuilder } from 'lib/helpers/router'

export const handler = async (event, context) => {
  return await new Router(event, context)

    .post('/roles', (request) => {
      const { body } = request
      return createRole(body).then((createdRole) =>
        responseBuilder.success.created({ body: createdRole }),
      )
    })

    .post('/roles/:id/users', (request) => {
      const { pathParameters, body } = request
      return createUserRole({
        roleId: pathParameters.id,
        userId: body.userId,
      }).then((createdUserRole) => responseBuilder.success.created({ body: createdUserRole }))
    })

    .post('/roles/:id/permissions', (request) => {
      const { pathParameters, body } = request
      return createRolePermission({
        roleId: pathParameters.id,
        permissionId: body.permissionId,
      }).then((createdRolePermission) =>
        responseBuilder.success.created({ body: createdRolePermission }),
      )
    })

    .dispatch()
}
