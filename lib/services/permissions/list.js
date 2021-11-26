import PermissionsModel from 'lib/models/permissions'
import pageResolver from 'lib/helpers/dynamo/page-resolver'

export default async ({ nameContains, lastKey, limit = 10 } = {}) => {
  let query = await PermissionsModel.scan()

  if (nameContains) query = PermissionsModel.scan('name').contains(nameContains)

  const data = await pageResolver(query, lastKey, limit)
  return {
    data: data.items,
    lastKey: data.lastKey
      ? Buffer.from(JSON.stringify(data.lastKey)).toString('base64')
      : undefined,
  }
}
