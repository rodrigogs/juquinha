import UsersService from 'lib/services/users'
import { default as Router, responseBuilder } from 'lib/helpers/router'

export const handler = async (event, context) => {
  return await new Router(event, context)

    .put('/users/:id', (request) => {
      const { pathParameters, body } = request
      return UsersService.update(pathParameters.id, body).then((updatedUser) =>
        responseBuilder.success.ok({ body: updatedUser }),
      )
    })

    .dispatch()
}
