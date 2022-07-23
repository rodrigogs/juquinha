import CrudServiceBuilder from '@juquinha/lib/helpers/crud-service-builder/index.mjs'
import create from './create.mjs'
import remove from './remove.mjs'
import list from './list.mjs'
import update from './update.mjs'
import getOneById from './get-one-by-id.mjs'
import getOneByUsername from './get-one-by-username.mjs'
import listRolesByUserId from './list-roles-by-user-id.mjs'
import listUsersByRoleId from './list-users-by-role-id.mjs'

export default new CrudServiceBuilder()
  .forEntity('users')
  .addMethod('create', create)
  .addMethod('remove', remove)
  .addMethod('list', list)
  .addMethod('update', update)
  .addMethod('getOneById', getOneById)
  .addMethod('getOneByUsername', getOneByUsername)
  .addMethod('listRolesByUserId', listRolesByUserId)
  .addMethod('listUsersByRoleId', listUsersByRoleId)
  .build()
