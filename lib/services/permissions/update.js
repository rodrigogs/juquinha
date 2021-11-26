import NotFoundError from 'lib/errors/api/not-found'
import PermissionsModel from 'lib/models/permissions'
import getOneById from './get-one-by-id'
import { deepAssign } from 'lib/common/helpers/object'

export default async (id, updatedInfo) => {
  const currentDoc = await getOneById(id)
  if (!currentDoc) throw new NotFoundError(`Permission not found for id "${id}"`)
  delete updatedInfo.id
  delete updatedInfo.createdAt
  delete updatedInfo.updatedAt
  delete updatedInfo.__version
  const { item } = await PermissionsModel.putNextVersion(
    currentDoc,
    (item) => deepAssign(item, updatedInfo),
    {
      maxAttempts: 3,
    },
  )
  return item
}
