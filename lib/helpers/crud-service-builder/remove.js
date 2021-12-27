import getModel from './get-model'

export default (entity) => {
  const Model = getModel(entity)
  return async (id) => Model.delete(id)
}
