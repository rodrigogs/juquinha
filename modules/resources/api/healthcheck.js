import { name as pkgName, version as pkgVersion } from '../../../package.json'
import { default as Router, responseBuilder } from '@juquinha/lib/helpers/router'

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
          message: `${pkgName}: ${pkgVersion}`,
        },
      }),
    )

    .dispatch()
}
