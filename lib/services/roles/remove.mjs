import RolesModel from '@juquinha/lib/models/roles.mjs'
import RolePermissionsModel from '@juquinha/lib/models/role-permissions.mjs'
import ConflictError from '@juquinha/lib/errors/api/conflict.mjs'
import i18n from '@juquinha/lib/i18n/index.mjs'

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
