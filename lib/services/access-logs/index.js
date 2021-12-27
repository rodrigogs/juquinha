import CrudServiceBuilder from 'lib/helpers/crud-service-builder'
import getOneByUserIdAndOccurredAt from './get-one-by-userId-and-occurred-at'
import create from './create'

const BUILD_METHODS = ['list', 'getOneById']

export default new CrudServiceBuilder()
  .forEntity('access-logs', { buildMethods: BUILD_METHODS })
  .addMethod('create', create)
  .addMethod('getOneByUserIdAndOccurredAt', getOneByUserIdAndOccurredAt)
  .build()
