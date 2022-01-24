import UserRolesModel from 'lib/models/user-roles'
import RolesModel from 'lib/models/roles'

export default async (roleId, { lastKey = undefined, limit = 10 } = {}) => {
  limit = parseInt(limit, 10)
  const data = await UserRolesModel.query('roleId')
    .using('role-users-index')
    .eq(roleId)
    .startAt(lastKey)
    .limit(limit)
    .exec()
  const users = await Promise.all(data.map((userRole) => RolesModel.get(userRole.roleId)))
  return {
    data: users.filter((user) => !!user).map((user) => ({ ...user, password: undefined })),
    lastKey: data.lastKey
      ? Buffer.from(JSON.stringify(data.lastKey)).toString('base64')
      : undefined,
  }
}
