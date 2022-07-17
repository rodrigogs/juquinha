import models from '@juquinha/lib/models'
import { capitalizeFirstLetter, kebabToCamel } from '@juquinha/lib/common/helpers/string'

export default (entity) => {
  const modelName = `${capitalizeFirstLetter(kebabToCamel(entity))}Model`
  return models[modelName]
}
