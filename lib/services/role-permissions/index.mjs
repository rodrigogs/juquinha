import CrudServiceBuilder from '@juquinha/lib/helpers/crud-service-builder/index.mjs'
import create from './create.mjs'
import remove from './remove.mjs'
import listPermissionsByRoleId from './list-permissions-by-role-id.mjs'
import listRolesByPermissionId from './list-roles-by-permission-id.mjs'

const BUILD_METHODS = []

export default new CrudServiceBuilder()
  .forEntity('role-permissions', { buildMethods: BUILD_METHODS })
  .addMethod('create', create)
  .addMethod('remove', remove)
  .addMethod('listPermissionsByRoleId', listPermissionsByRoleId)
  .addMethod('listRolesByPermissionId', listRolesByPermissionId)
  .build()
