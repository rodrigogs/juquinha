import { v4 as createId } from 'uuid'
import ConflictError from '@juquinha/lib/errors/api/conflict.mjs'
import i18n from '@juquinha/lib/i18n/index.mjs'
import getModel from './get-model.mjs'
import getOneByName from './get-one-by-name.mjs'

export default (entity) => {
  const Model = getModel(entity)
  return async (payload) => {
    payload = { id: createId(), ...payload }
    const entityExists = payload.name && await getOneByName(entity)(payload.name)
    if (entityExists) {
      throw new ConflictError(
        i18n(`A ${entity} with name "{{${entity}Name}}" already exists`, {
          [`${entity}Name`]: payload.name,
        }),
      )
    }
    return Model.create(payload)
  }
}
