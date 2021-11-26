import removeRole from 'lib/services/roles/remove'
import removeRoleUser from 'lib/services/user-roles/remove'
import removeRolePermission from 'lib/services/role-permissions/remove'
import { default as Router, responseBuilder } from 'lib/helpers/router'

export const handler = async (event, context) => {
  return await new Router(event, context)

    .delete('/roles/:id', (request) => {
      const { pathParameters } = request
      return removeRole(pathParameters.id).then(() => responseBuilder.success.noContent())
    })

    .delete('/roles/:id/users/:userId', (request) => {
      const { pathParameters } = request
      return removeRoleUser({
        userId: pathParameters.userId,
        roleId: pathParameters.id,
      }).then(() => responseBuilder.success.noContent())
    })

    .delete('/roles/:id/permissions/:permissionId', (request) => {
      const { pathParameters } = request
      return removeRolePermission({
        permissionId: pathParameters.permissionId,
        roleId: pathParameters.id,
      }).then(() => responseBuilder.success.noContent())
    })

    .dispatch()
}
