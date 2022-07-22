import removeRole from '@juquinha/lib/services/roles/remove.mjs'
import removeRoleUser from '@juquinha/lib/services/user-roles/remove.mjs'
import removeRolePermission from '@juquinha/lib/services/role-permissions/remove.mjs'
import { default as Router, responseBuilder } from '@juquinha/lib/helpers/router/index.mjs'

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
