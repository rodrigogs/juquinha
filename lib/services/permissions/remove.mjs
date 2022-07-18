import PermissionsModel from '@juquinha/lib/models/permissions.mjs'
import RolePermissionsModel from '@juquinha/lib/models/role-permissions.mjs'
import ConflictError from '../../errors/api/conflict.mjs'
import i18n from '@juquinha/lib/i18n/index.mjs'

export default async (id) => {
  const permissionRolesCount = await RolePermissionsModel.query('permissionId')
    .using('permission-roles-index')
    .eq(id)
    .count()
    .exec()
  if (permissionRolesCount > 0) {
    throw new ConflictError(
      i18n(
        "There are {{count}} {{entities}} for this {{entity}}, it's necessary to remove those before deleting the {{entity}}",
        {
          count: permissionRolesCount,
          entities: i18n('roles'),
          entity: i18n('permission'),
        },
      ),
    )
  }
  return PermissionsModel.delete(id)
}
