import getModel from './get-model.mjs'

export default (entity) => {
  const Model = getModel(entity)
  return (id) => Model.get(id)
}
