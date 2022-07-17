import RolePermissionsModel from '@juquinha/lib/models/role-permissions'
import RolesModel from '@juquinha/lib/models/roles'

export default async (permissionId, { lastKey, limit = 10 } = {}) => {
  limit = parseInt(limit, 10)
  const data = await RolePermissionsModel.query('permissionId')
    .using('permission-roles-index')
    .eq(permissionId)
    .startAt(lastKey)
    .limit(limit)
    .exec()
  const roles = await Promise.all(
    data.map((rolePermission) => RolesModel.get(rolePermission.roleId)),
  )
  return {
    data: roles.filter((role) => !!role),
    lastKey: data.lastKey
      ? Buffer.from(JSON.stringify(data.lastKey)).toString('base64')
      : undefined,
  }
}
