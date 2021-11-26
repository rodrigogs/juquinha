import updateRole from 'lib/services/roles/update'
import { default as Router, responseBuilder } from 'lib/helpers/router'

export const handler = async (event, context) => {
  return await new Router(event, context)

    .put('/roles/:id', (request) => {
      const { pathParameters, body } = request
      return updateRole(pathParameters.id, body).then((updatedRole) =>
        responseBuilder.success.ok({ body: updatedRole }),
      )
    })

    .dispatch()
}
