import getModel from './get-model'
import pageResolver from '@juquinha/lib/helpers/dynamo/page-resolver'

export default (entity) => {
  const Model = getModel(entity)
  return async ({ nameContains, lastKey, limit = 10 } = {}) => {
    limit = parseInt(limit, 10)
    if (lastKey && typeof lastKey === 'string') {
      lastKey = JSON.parse(Buffer.from(lastKey, 'base64').toString('utf8'))
    }

    let query = await Model.scan()

    if (nameContains) query = Model.scan('name').contains(nameContains)

    const data = await pageResolver(query, lastKey, limit)
    return {
      data: data.items,
      lastKey: data.lastKey
        ? Buffer.from(JSON.stringify(data.lastKey)).toString('base64')
        : undefined,
    }
  }
}
