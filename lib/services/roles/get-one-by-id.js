import RolesModel from 'lib/models/roles'

export default async (roleId) => {
  const role = await RolesModel.get(roleId)
  return role
}
