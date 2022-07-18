import UserRolesModel from '@juquinha/lib/models/user-roles.mjs'

export default async ({ userId, roleId }) => {
  const exists = await UserRolesModel.get({ userId, roleId })
  if (exists) await UserRolesModel.delete({ userId, roleId })
  return UserRolesModel.create({ userId, roleId })
}
