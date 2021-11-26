import removeUser from 'lib/services/users/remove'
import removeUserRole from 'lib/services/user-roles/remove'
import { default as Router, responseBuilder } from 'lib/helpers/router'

export const handler = async (event, context) => {
  return await new Router(event, context)

    .delete('/users/:id', (request) => {
      const { pathParameters } = request
      return removeUser(pathParameters.id).then(() => responseBuilder.success.noContent())
    })

    .delete('/users/:id/roles/:roleId', (request) => {
      const { pathParameters } = request
      return removeUserRole({
        userId: pathParameters.id,
        roleId: pathParameters.roleId,
      }).then(() => responseBuilder.success.noContent())
    })

    .dispatch()
}
