import getModel from './get-model'
import { v4 as createId } from 'uuid'
import ConflictError from '@juquinha/lib/errors/api/conflict'
import i18n from '@juquinha/lib/i18n'
import getOneByName from './get-one-by-name'

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
