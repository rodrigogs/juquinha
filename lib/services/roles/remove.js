import RolesModel from 'lib/models/roles'
import RolePermissionsModel from 'lib/models/role-permissions'
import ConflictError from 'lib/errors/api/conflict'
import i18n from 'lib/i18n'

export default async (id) => {
  const rolePermissionsCount = await RolePermissionsModel.query('roleId').eq(id).count().exec()
  if (rolePermissionsCount > 0) {
    throw new ConflictError(
      i18n(
        "There are {{count}} {{entities}} for this {{entity}}, it's necessary to remove those before deleting the {{entity}}",
        {
          count: rolePermissionsCount,
          entities: i18n('permissions'),
          entity: i18n('role'),
        },
      ),
    )
  }
  await RolesModel.delete(id)
}
