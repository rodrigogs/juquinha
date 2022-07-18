import getModel from './get-model.mjs'
import NotFoundError from '@juquinha/lib/errors/api/not-found.mjs'
import getOneById from './get-one-by-id.mjs'

export default (entity) => {
  const Model = getModel(entity)
  return async (id, updatedInfo) => {
    const currentDoc = await getOneById(entity)(id)
    if (!currentDoc) throw new NotFoundError(`${entity} not found for id "${id}"`)
    delete updatedInfo.id
    delete updatedInfo.createdAt
    delete updatedInfo.updatedAt
    delete updatedInfo.__version
    await Model.update(id, updatedInfo)
  }
}
