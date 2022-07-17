import RolesModel from '@juquinha/lib/models/roles'
import RolePermissionsModel from '@juquinha/lib/models/role-permissions'
import ConflictError from '@juquinha/lib/errors/api/conflict'
import i18n from '@juquinha/lib/i18n'

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
