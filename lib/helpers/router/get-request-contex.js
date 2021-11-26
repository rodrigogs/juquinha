import querystring from 'querystring'
import { unescapeStrings } from '../../common/helpers/object'

/**
 * Returns a normalized request context object from an ApiGateway request event.
 *
 * @return {Object} requestContext
 * @return {String} requestContext.httpMethod
 * @return {Object} requestContext.headers
 * @return {Object} requestContext.multiValueHeaders
 * @return {Object} requestContext.queryStringParameters
 * @return {Object} requestContext.multiValueQueryStringParameters
 * @return {Object} requestContext.pathParameters
 * @return {Object} requestContext.session
 * @return {*} requestContext.body
 * @return {Object|null} requestContext.session
 */
export default (event) => {
  const {
    requestContext,
    httpMethod,
    headers,
    multiValueHeaders,
    body,
    queryStringParameters,
    multiValueQueryStringParameters,
    pathParameters,
    path,
    resource,
  } = event

  const { authorizer } = requestContext || {}
  const { session } = authorizer || {}

  let parsedBody
  let parsedSession

  try {
    const contentType = headers['content-type'] || headers['Content-Type'] || ''
    if (contentType.search('application/json') > -1) {
      parsedBody = typeof body === 'string' ? JSON.parse(body) : event.body
    } else if (contentType.search('application/x-www-form-urlencoded') > -1) {
      parsedBody = typeof body === 'string' ? querystring.parse(body) : event.body
    }
    parsedSession = typeof session === 'string' ? JSON.parse(session) : event.session
  } catch (err) {
    console.error('Error parsing body or session', err)
  }

  return {
    httpMethod: (httpMethod || '').toUpperCase(),
    headers: unescapeStrings(headers) || {},
    multiValueHeaders: unescapeStrings(multiValueHeaders) || {},
    queryStringParameters: unescapeStrings(queryStringParameters) || {},
    multiValueQueryStringParameters: unescapeStrings(multiValueQueryStringParameters) || {},
    pathParameters: unescapeStrings(pathParameters) || {},
    body: parsedBody,
    session: parsedSession,
    path,
    resource,
  }
}
