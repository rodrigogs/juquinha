import NotFoundError from '@juquinha/lib/errors/api/not-found.mjs'
import RolePermissionsModel from '@juquinha/lib/models/role-permissions.mjs'
import getOneById from '@juquinha/lib/helpers/crud-service-builder/get-one-by-id.mjs'
import i18n from '@juquinha/lib/i18n/index.mjs'

const getOneRoleById = getOneById('roles')
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
