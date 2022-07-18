import { ConflictError } from '@juquinha/lib/errors/api/index.mjs'
import getModel from './get-model.mjs'

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
