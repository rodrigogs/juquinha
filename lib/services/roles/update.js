import RolesModel from 'lib/models/roles'
import getOneById from 'lib/services/roles/get-one-by-id'
import { deepAssign } from 'lib/common/helpers/object'

export default async (id, { name, description }) => {
  const role = { name, description }
  let currentDoc = await getOneById(id)
  if (!currentDoc) currentDoc = await RolesModel.create(role)
  const { item } = await RolesModel.putNextVersion(currentDoc, (item) => deepAssign(item, role), {
    maxAttempts: 3,
  })
  return item
}
