import NotFoundError from 'lib/errors/api/not-found'
import RolePermissionsModel from 'lib/models/role-permissions'
import getOneRoleById from 'lib/services/roles/get-one-by-id'
import getOneById from 'lib/helpers/crud-service-builder/get-one-by-id'
import i18n from 'lib/i18n'

const getOnePermissionById = getOneById('permissions')

export default async ({ roleId, permissionId }) => {
  const rolePermission = { roleId, permissionId }
  const roleExists = await getOneRoleById(roleId)
  if (!roleExists) throw new NotFoundError(i18n('Role not found for id "{{roleId}}"', { roleId }))
  const permissionExists = await getOnePermissionById(permissionId)
  if (!permissionExists) {
    throw new NotFoundError(
      i18n('Permission not found for id "{{permissionId}}"', { permissionId }),
    )
  }
  return RolePermissionsModel.create(rolePermission)
}
