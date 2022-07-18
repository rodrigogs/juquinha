import RolesModel from '@juquinha/lib/models/roles.mjs'

export default async (roleId) => {
  const role = await RolesModel.get(roleId)
  return role
}
