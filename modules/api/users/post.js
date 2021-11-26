import createUser from 'lib/services/users/create'
import createUserRole from 'lib/services/user-roles/create'
import { default as Router, responseBuilder } from 'lib/helpers/router'

export const handler = async (event, context) => {
  return await new Router(event, context)

    .post('/users', (request) => {
      const { body } = request
      return createUser(body).then((createdUser) =>
        responseBuilder.success.created({ body: createdUser }),
      )
    })

    .post('/users/:id/roles', (request) => {
      const { pathParameters, body } = request
      return createUserRole({
        userId: pathParameters.id,
        roleId: body.roleId,
      }).then((createdUserRole) => responseBuilder.success.created({ body: createdUserRole }))
    })

    .dispatch()
}
