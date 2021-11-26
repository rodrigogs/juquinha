import RolesModel from 'lib/models/roles'

export default async (roleId) => {
  let role = await RolesModel.get(roleId)
  if (role) return role
  if (role) role = await RolesModel.create(role)
  return role
}
