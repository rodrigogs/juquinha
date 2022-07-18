import * as models from '@juquinha/lib/models/index.mjs'
import { capitalizeFirstLetter, kebabToCamel } from '@juquinha/lib/common/helpers/string.mjs'

export default (entity) => {
  const modelName = `${capitalizeFirstLetter(kebabToCamel(entity))}Model`
  // eslint-disable-next-line import/namespace
  return models[modelName]
}
