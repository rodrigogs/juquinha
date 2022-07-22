import { APP_NAME } from '@juquinha/config/env.mjs'
import { default as Router, responseBuilder } from '@juquinha/lib/helpers/router/index.mjs'

/**
 * @api {get} / Health check
 * @apiName HealthCheck
 * @apiGroup Health
 *
 * @apiSuccess {String} message Project name and version.
 */
export const handler = async (event, context) => {
  return await new Router(event, context)

    .get('/', () =>
      responseBuilder.success.ok({
        body: {
          message: `${APP_NAME}`,
        },
      }),
    )

    .dispatch()
}
