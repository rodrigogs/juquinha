import CrudServiceBuilder from '@juquinha/lib/helpers/crud-service-builder/index.mjs'
import list from './list.mjs'
import create from './create.mjs'
import update from './update.mjs'
import remove from './remove.mjs'
import getOneById from './get-one-by-id.mjs'
import listUsersByRoleId from './list-users-by-role-id.mjs'

export default new CrudServiceBuilder()
  .forEntity('roles')
  .addMethod('list', list)
  .addMethod('create', create)
  .addMethod('update', update)
  .addMethod('remove', remove)
  .addMethod('getOneById', getOneById)
  .addMethod('listUsersByRoleId', listUsersByRoleId)
  .build()
