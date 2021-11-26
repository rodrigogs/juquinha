import removePermission from 'lib/services/permissions/remove'
import removeRolePermission from 'lib/services/role-permissions/remove'
import { default as Router, responseBuilder } from 'lib/helpers/router'

export const handler = async (event, context) => {
  return await new Router(event, context)

    .delete('/permissions/:id', (request) => {
      const { pathParameters } = request
      return removePermission(pathParameters.id).then(() => responseBuilder.success.noContent())
    })

    .delete('/permissions/:id/roles/:roleId', (request) => {
      const { pathParameters } = request
      return removeRolePermission({
        permissionId: pathParameters.id,
        roleId: pathParameters.roleId,
      }).then(() => responseBuilder.success.noContent())
    })

    .dispatch()
}
