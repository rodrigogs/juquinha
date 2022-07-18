import UsersService from '@juquinha/lib/services/users'
import UserRolesService from '@juquinha/lib/services/user-roles'
import { default as Router, responseBuilder } from '@juquinha/lib/helpers/router/index.mjs'

export const handler = async (event, context) => {
  return await new Router(event, context)

    .delete('/users/:id', (request) => {
      const { pathParameters } = request
      return UsersService.remove(pathParameters.id).then(() => responseBuilder.success.noContent())
    })

    .delete('/users/:id/roles/:roleId', (request) => {
      const { pathParameters } = request
      return UserRolesService.remove({
        userId: pathParameters.id,
        roleId: pathParameters.roleId,
      }).then(() => responseBuilder.success.noContent())
    })

    .dispatch()
}
