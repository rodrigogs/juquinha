import getModel from './get-model'

export default (entity) => {
  const Model = getModel(entity)
  return (name) =>
    Model.query('name')
      .using('name-index')
      .eq(name)
      .limit(1)
      .exec()
      .then((results) => results && results.length && results[0])
}
