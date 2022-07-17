import UsersModel from '@juquinha/lib/models/users'
import pageResolver from '@juquinha/lib/helpers/dynamo/page-resolver'

export default async ({ lastKey, limit = 10 } = {}) => {
  limit = parseInt(limit, 10)
  const query = await UsersModel.scan()
  const data = await pageResolver(query, lastKey, limit)
  return {
    data: data.items.map((item) => ({ ...item, password: undefined })),
    lastKey: data.lastKey
      ? Buffer.from(JSON.stringify(data.lastKey)).toString('base64')
      : undefined,
  }
}
