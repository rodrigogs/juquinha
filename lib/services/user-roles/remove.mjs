import UserRolesModel from '@juquinha/lib/models/user-roles.mjs'

export default async ({ userId, roleId }) => {
  await UserRolesModel.delete({ userId, roleId })
}
