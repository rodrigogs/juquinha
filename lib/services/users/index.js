import CrudServiceBuilder from '@juquinha/lib/helpers/crud-service-builder'
import create from './create'
import remove from './remove'
import list from './list'
import update from './update'
import getOneById from './get-one-by-id'
import getOneByUsername from './get-one-by-username'
import listRolesByUserId from './list-roles-by-user-id'
import listUsersByRoleId from './list-users-by-role-id'

const BUILD_METHODS = []

export default new CrudServiceBuilder()
  .forEntity('users', { buildMethods: BUILD_METHODS })
  .addMethod('create', create)
  .addMethod('remove', remove)
  .addMethod('list', list)
  .addMethod('update', update)
  .addMethod('getOneById', getOneById)
  .addMethod('getOneByUsername', getOneByUsername)
  .addMethod('listRolesByUserId', listRolesByUserId)
  .addMethod('listUsersByRoleId', listUsersByRoleId)
  .build()
