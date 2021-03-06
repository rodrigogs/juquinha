import { ConflictError } from 'lib/errors/api'
import getModel from './get-model'

export default (entity) => {
  const Model = getModel(entity)
  return (name) =>
    Model.query('name')
      .using('name-index')
      .eq(name)
      .limit(1)
      .exec()
      .then((results) => {
        if (!results || results.length === 0) return null
        if (results.length > 1) throw new ConflictError(`Found more than one ${entity} with name "${name}"`)
        return results[0]
      })
}
