import UsersService from '@juquinha/lib/services/users'
import UserRolesService from '@juquinha/lib/services/user-roles'
import { default as Router, responseBuilder } from '@juquinha/lib/helpers/router/index.mjs'

export const handler = async (event, context) => {
  return await new Router(event, context)

    .post('/users', (request) => {
      const { body } = request
      return UsersService.create(body).then((createdUser) =>
        responseBuilder.success.created({ body: createdUser }),
      )
    })

    .post('/users/:id/roles', (request) => {
      const { pathParameters, body } = request
      return UserRolesService.create({
        userId: pathParameters.id,
        roleId: body.roleId,
      }).then((createdUserRole) => responseBuilder.success.created({ body: createdUserRole }))
    })

    .dispatch()
}
