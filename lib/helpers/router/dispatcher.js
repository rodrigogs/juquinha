import * as cache from '../../cache'
import createAccessLog from '../../services/access-logs/create'
import responseBuilder from '../response-builder'

// const applyToEntities = ['users', 'roles', 'permissions']

// const validateEntities = (mainEntity, secondaryEntity) => {
//   if (!mainEntity || applyToEntities.indexOf(mainEntity) === -1) return false
//   return !(secondaryEntity && applyToEntities.indexOf(secondaryEntity) === -1)
// }

const resolveCacheParams = (request) => {
  const [, mainEntity, mainId, secondaryEntity, secondaryId] = request.path.split('/')
  const useCache = /* validateEntities(mainEntity, secondaryEntity) */ false
  let partition = mainEntity
  if (secondaryEntity) partition += secondaryEntity
  let key = mainId
  if (secondaryId) key += secondaryId
  return { partition, key, useCache }
}

const resolveCache = async (httpMethod, partition, key) => {
  if (httpMethod === 'GET') {
    const cachedResponse = await cache.get(partition, key)
    if (cachedResponse) return cachedResponse.value
  } else {
    await cache.del(partition, key)
  }
}

const persistCache = (partition, key, response) => cache.set(partition, key, response)

const processRequest = async (event, context, router) => {
  const { partition, key, useCache } = resolveCacheParams(event)

  let response
  let error
  try {
    if (useCache) response = await resolveCache(event.httpMethod, partition, key)
    if (!response) response = await router.dispatch(event, context)
    if (useCache) await persistCache(partition, key, response)
  } catch (err) {
    error = err
  }

  return { response, error }
}

const postRequest = async (request, response, error) => {
  // const userId =
  //   (request.session && request.session.user && request.session.user.id) || 'unavailable'
  const payload = {
    // userId,
    occurredAt: String(Date.now()),
    method: request.httpMethod,
    path: request.path || '/',
    pathParams: JSON.stringify(request.pathParameters),
    queryParams: JSON.stringify(request.queryStringParameters),
    body: JSON.stringify(request.body),
    statusCode: response ? Number(response.statusCode) : undefined,
  }
  if (error) {
    const errorPayload = responseBuilder.genericError(error)
    payload.statusCode = Number(errorPayload.statusCode)
    payload.errorMessage = errorPayload.body.message
  }
  if (!payload.statusCode) {
    console.error(`Ei, você esqueceu de retornar uma resposta para a rota: ${request.path}

Esta requisição será armazenada com status 0

Arruma lá 🤖`)
    payload.statusCode = 0
  }
  await createAccessLog(payload)
}

export default async (request, context, router) => {
  const { response, error } = await processRequest(request, context, router)
  await postRequest(request, response, error)
  if (error) throw error
  return response
}
