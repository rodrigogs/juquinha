import UsersModel from 'lib/models/users'
import getOneById from 'lib/services/users/get-one-by-id'
import { deepAssign } from 'lib/common/helpers/object'

export default async (id, updatedInfo) => {
  delete updatedInfo.id
  delete updatedInfo.createdAt
  delete updatedInfo.updatedAt
  delete updatedInfo.__version
  const user = { ...updatedInfo }
  delete user.master
  let currentDoc = await getOneById(id)
  if (!currentDoc) await UsersModel.create(user)
  ;({ item: currentDoc } = await UsersModel.putNextVersion(
    currentDoc,
    (item) => deepAssign(item, updatedInfo),
    {
      maxAttempts: 3,
    },
  ))
  return { ...currentDoc, password: undefined }
}
