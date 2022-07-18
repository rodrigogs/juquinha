import RolesModel from '@juquinha/lib/models/roles.mjs'
import pageResolver from '@juquinha/lib/helpers/dynamo/page-resolver.mjs'

export default async ({ nameContains, lastKey, limit = 10 } = {}) => {
  limit = parseInt(limit, 10)
  let query = await RolesModel.scan()

  if (nameContains) query = RolesModel.scan('name').contains(nameContains)

  const data = await pageResolver(query, lastKey, limit)
  return {
    data: data.items,
    lastKey: data.lastKey
      ? Buffer.from(JSON.stringify(data.lastKey)).toString('base64')
      : undefined,
  }
}
