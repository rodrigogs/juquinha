import CrudServiceBuilder from '@juquinha/lib/helpers/crud-service-builder'
import list from './list'
import create from './create'
import update from './update'
import remove from './remove'
import getOneById from './get-one-by-id'
import listUsersByRoleId from './list-users-by-role-id'

const BUILD_METHODS = []

export default new CrudServiceBuilder()
  .forEntity('roles', { buildMethods: BUILD_METHODS })
  .addMethod('list', list)
  .addMethod('create', create)
  .addMethod('update', update)
  .addMethod('remove', remove)
  .addMethod('getOneById', getOneById)
  .addMethod('listUsersByRoleId', listUsersByRoleId)
  .build()
