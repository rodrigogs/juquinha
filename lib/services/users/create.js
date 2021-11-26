import { v4 as uuid } from 'uuid'
import UsersModel from 'lib/models/users'
import getOneUserByUsername from './get-one-by-username'
import ConflictError from 'lib/errors/api/conflict'
import i18n from 'lib/i18n'

export default async (userInfo) => {
  let user = { ...userInfo }
  delete user.id
  delete user.master

  const exists = user.username && await getOneUserByUsername(user.username)
  if (exists) throw new ConflictError(i18n('user.errors.exists'))

  user.id = user.id || uuid()
  user = await UsersModel.create({ ...userInfo, ...user })
  return { ...user, password: undefined }
}
