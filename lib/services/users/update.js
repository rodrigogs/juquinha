import UsersModel from '@juquinha/lib/models/users'
import getOneById from '@juquinha/lib/services/users/get-one-by-id'

export default async (id, updatedInfo) => {
  delete updatedInfo.id
  delete updatedInfo.createdAt
  delete updatedInfo.updatedAt
  delete updatedInfo.__version
  const newUserData = { ...updatedInfo }
  await UsersModel.update(id, newUserData)
  const user = await getOneById(id)
  return { ...user, password: undefined }
}
