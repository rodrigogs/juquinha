import CrudServiceBuilder from 'lib/helpers/crud-service-builder'
import create from './create'
import remove from './remove'
import listRolesByUserId from './list-roles-by-user-id'
import listUsersByRoleId from './list-users-by-role-id'

const BUILD_METHODS = []

export default new CrudServiceBuilder()
  .forEntity('user-roles', { buildMethods: BUILD_METHODS })
  .addMethod('create', create)
  .addMethod('remove', remove)
  .addMethod('listRolesByUserId', listRolesByUserId)
  .addMethod('listUsersByRoleId', listUsersByRoleId)
  .build()
