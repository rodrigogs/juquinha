import updateRole from '@juquinha/lib/services/roles/update.mjs'
import { default as Router, responseBuilder } from '@juquinha/lib/helpers/router/index.mjs'

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
