import RolePermissionsModel from 'lib/models/role-permissions'
import PermissionsModel from 'lib/models/permissions'

export default async (roleId, { lastKey, limit = 10 } = {}) => {
  limit = parseInt(limit, 10)
  const data = await RolePermissionsModel.query('roleId')
    .eq(roleId)
    .startAt(lastKey)
    .limit(limit)
    .exec()
  const permissions = await Promise.all(
    data.map((rolePermission) => PermissionsModel.get(rolePermission.permissionId)),
  )
  return {
    data: permissions.filter((permission) => !!permission),
    lastKey: data.lastKey
      ? Buffer.from(JSON.stringify(data.lastKey)).toString('base64')
      : undefined,
  }
}
