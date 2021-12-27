import models from 'lib/models'
import { capitalizeFirstLetter, kebabToCamel } from 'lib/common/helpers/string'

export default (entity) => {
  const modelName = `${capitalizeFirstLetter(kebabToCamel(entity))}Model`
  return models[modelName]
}
