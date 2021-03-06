import PermissionsModel from 'lib/models/permissions'
import RolePermissionsModel from 'lib/models/role-permissions'
import ConflictError from 'lib/errors/api/conflict'
import i18n from 'lib/i18n'

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
