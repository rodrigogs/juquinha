import CrudServiceBuilder from '@juquinha/lib/helpers/crud-service-builder/index.mjs'
import create from './create.mjs'
import remove from './remove.mjs'

const BUILD_METHODS = ['update', 'list', 'getOneById', 'getOneByName']

export default new CrudServiceBuilder()
  .forEntity('permissions')
  .buildMethods(BUILD_METHODS)
  .addMethod('create', create)
  .addMethod('remove', remove)
  .build()
