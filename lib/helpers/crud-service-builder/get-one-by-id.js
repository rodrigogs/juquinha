import getModel from './get-model'

export default (entity) => {
  const Model = getModel(entity)
  return (id) => Model.get(id)
}
