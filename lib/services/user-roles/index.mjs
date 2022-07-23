import CrudServiceBuilder from '@juquinha/lib/helpers/crud-service-builder/index.mjs'
import create from './create.mjs'
import remove from './remove.mjs'
import listRolesByUserId from './list-roles-by-user-id.mjs'
import listUsersByRoleId from './list-users-by-role-id.mjs'

export default new CrudServiceBuilder()
  .forEntity('user-roles')
  .addMethod('create', create)
  .addMethod('remove', remove)
  .addMethod('listRolesByUserId', listRolesByUserId)
  .addMethod('listUsersByRoleId', listUsersByRoleId)
  .build()
