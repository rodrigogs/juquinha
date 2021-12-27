import CrudServiceBuilder from 'lib/helpers/crud-service-builder'
import create from './create'
import remove from './remove'
import listPermissionsByRoleId from './list-permissions-by-role-id'
import listRolesByPermissionId from './list-roles-by-permission-id'

const BUILD_METHODS = []

export default new CrudServiceBuilder()
  .forEntity('role-permissions', { buildMethods: BUILD_METHODS })
  .addMethod('create', create)
  .addMethod('remove', remove)
  .addMethod('listPermissionsByRoleId', listPermissionsByRoleId)
  .addMethod('listRolesByPermissionId', listRolesByPermissionId)
  .build()
