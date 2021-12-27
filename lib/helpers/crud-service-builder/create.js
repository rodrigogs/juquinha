import getModel from './get-model'
import { v4 as createId } from 'uuid'
import ConflictError from 'lib/errors/api/conflict'
import i18n from 'lib/i18n'
import getOneByName from './get-one-by-name'

export default (entity) => {
  const Model = getModel(entity)
  return async (payload) => {
    payload = { id: createId(), ...payload }
    const entityExists = await getOneByName(entity)(payload.name)
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
