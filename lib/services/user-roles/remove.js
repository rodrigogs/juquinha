import UserRolesModel from 'lib/models/user-roles'

export default async ({ userId, roleId }) => {
  await UserRolesModel.delete({ userId, roleId })
}
