import RolesModel from '@juquinha/lib/models/roles.mjs'
import getOneById from '@juquinha/lib/services/roles/get-one-by-id.mjs'

export default async (id, updatedInfo) => {
  delete updatedInfo.id
  delete updatedInfo.createdAt
  delete updatedInfo.updatedAt
  delete updatedInfo.__version
  const newRoleData = { ...updatedInfo }
  await RolesModel.update(id, newRoleData)
  const role = await getOneById(id)
  return { ...role }
}
