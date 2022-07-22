import EverestateRouter from '@everestate/serverless-router'
import { HTTP } from '@everestate/serverless-router-aws'
import i18n from '@juquinha/lib/i18n/index.mjs'
import { STAGE } from '@juquinha/config/env.mjs'
import dispatcher from './dispatcher.mjs'
import middlewares from './middlewares/index.mjs'
import getRequestContext from './get-request-contex.mjs'
import { default as responseBuilder, genericError } from '@juquinha/lib/helpers/response-builder.mjs'

/**
 * Request structure object
 * @typedef {Object} RequestStructure
 * @param {Object} request AWS Lambda HTTP event object
 * @param {Object} context Request context object
 */

/**
 * Response structure object
 * @typedef {Object} ResponseStructure
 * @param {Object} request AWS Lambda HTTP event object
 * @param {Object} context Request context object
 * @param {Object} response Response object
 */

/**
 * BeforeHook function
 * @typedef {Function} BeforeHookFunction
 * @param {Object} request AWS Lambda HTTP event object
 * @param {Object} context Request context object
 * @returns {Promise<RequestStructure>}
 */

/**
 * BeforeHook function
 * @typedef {Function} AfterHookFunction
 * @param {Object} request AWS Lambda HTTP event object
 * @param {Object} context Request context object
 * @param {Object} response Response object
 * @returns {Promise<ResponseStructure>}
 */

/**
 * @class Router
 * @param {Object} event
 * @param {Object} context
 * @param {Object} [options] Global options object. These options can be overwritten in the method.
 * @param {Object} [options.hooks]
 * @param {BeforeHookFunction} [options.hooks.before]
 * @param {AfterHookFunction} [options.hooks.after]
 */
export default class Router {
  constructor (event, context, options) {
    let { path } = event
    if (path.startsWith(`/${STAGE}`)) path = path.replace(`/${STAGE}`, '')
    this.request = getRequestContext({ ...event, path })
    this.context = { ...context }
    this.options = { ...options }
    this.router = new EverestateRouter([HTTP])
    // Default middlewares
    this.use(...middlewares)
    // Default router mismatch
    this.mismatch(() => {
      const { path, httpMethod } = this.request
      return Promise.reject(
        new Error(i18n('Unknown route: {{httpMethod}} {{path}}', { httpMethod, path })),
      )
    })
  }

  /**
   * @param {String} method
   * @param {String} path
   * @param {Function} controller
   * @param {Object} [options]
   * @param {Object} [options.hooks]
   * @param {BeforeHookFunction} [options.hooks.before]
   * @param {AfterHookFunction} [options.hooks.after]
   * @private
   */
  _wrapHttpMethod (method, path, controller, options) {
    options = options || this.options || {}
    options.hooks = options.hooks || {}
    this.router.http[method](path, async () => {
      let request = { ...this.request }
      let context = { ...this.context }
      if (options.hooks.before instanceof Function) {
        ;({ request, context } = await options.hooks.before(request, context))
      }
      let response = await controller(request, context)
      if (options.hooks.after instanceof Function) {
        response = await options.hooks.after(request, context, response)
      }
      return response
    })
  }

  /**
   * @param {Function} middlewares
   */
  use (...middlewares) {
    middlewares.forEach((middleware) => this.router.use(middleware))
    return this
  }

  /**
   * @param {String} path
   * @param {Function} controller
   */
  get (path, controller) {
    this._wrapHttpMethod('get', path, controller)
    return this
  }

  /**
   * @param {String} path
   * @param {Function} controller
   */
  post (path, controller) {
    this._wrapHttpMethod('post', path, controller)
    return this
  }

  /**
   * @param {String} path
   * @param {Function} controller
   */
  put (path, controller) {
    this._wrapHttpMethod('put', path, controller)
    return this
  }

  /**
   * @param {String} path
   * @param {Function} controller
   */
  patch (path, controller) {
    this._wrapHttpMethod('path', path, controller)
    return this
  }

  /**
   * @param {String} path
   * @param {Function} controller
   */
  delete (path, controller) {
    this._wrapHttpMethod('delete', path, controller)
    return this
  }

  /**
   * @param {Function} handler
   */
  mismatch (handler) {
    this.router.mismatch(handler)
    return this
  }

  /**
   * @returns {Promise<*|(*&{headers: *&{"Access-Control-Allow-Origin": string, "Access-Control-Allow-Credentials": boolean, "Access-Control-Allow-Headers": string, "Content-Type": string}, body: any, statusCode: number})>}
   */
  async dispatch () {
    try {
      return await dispatcher(this.request, this.context, this.router)
    } catch (err) {
      return genericError(err)
    }
  }
}

export { getRequestContext, responseBuilder }
