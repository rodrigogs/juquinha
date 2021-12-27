import CrudServiceBuilder from 'lib/helpers/crud-service-builder'
import create from './create'
import remove from './remove'

const BUILD_METHODS = ['update', 'list', 'getOneById', 'getOneByName']

export default new CrudServiceBuilder()
  .forEntity('permissions', { buildMethods: BUILD_METHODS })
  .addMethod('create', create)
  .addMethod('remove', remove)
  .build()
