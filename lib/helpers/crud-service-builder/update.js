import getModel from './get-model'
import NotFoundError from 'lib/errors/api/not-found'
import getOneById from './get-one-by-id'
import { deepAssign } from 'lib/common/helpers/object'

export default (entity) => {
  const Model = getModel(entity)
  return async (id, updatedInfo) => {
    const currentDoc = await getOneById(entity)(id)
    if (!currentDoc) throw new NotFoundError(`${entity} not found for id "${id}"`)
    delete updatedInfo.id
    delete updatedInfo.createdAt
    delete updatedInfo.updatedAt
    delete updatedInfo.__version
    const { item } = await Model.putNextVersion(
      currentDoc,
      (item) => deepAssign(item, updatedInfo),
      {
        maxAttempts: 3,
      },
    )
    return item
  }
}
