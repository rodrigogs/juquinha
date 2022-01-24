import UserRolesModel from 'lib/models/user-roles'
import RolesModel from 'lib/models/roles'

export default async (userId, { lastKey = undefined, limit = 10 } = {}) => {
  limit = parseInt(limit, 10)
  const data = await UserRolesModel.query('userId').eq(userId).startAt(lastKey).limit(limit).exec()
  const roles = await Promise.all(data.map((userRole) => RolesModel.get(userRole.roleId)))
  return {
    data: roles.filter((role) => !!role),
    lastKey: data.lastKey
      ? Buffer.from(JSON.stringify(data.lastKey)).toString('base64')
      : undefined,
  }
}
