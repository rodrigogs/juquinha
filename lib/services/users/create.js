import { v4 as uuid } from 'uuid'
import UsersModel from 'lib/models/users'
import getOneUserByUsername from './get-one-by-username'
import ConflictError from 'lib/errors/api/conflict'
import BadRequestError from 'lib/errors/api/bad-request'
import i18n from 'lib/i18n'
import { isObject } from 'lib/common/helpers/object'

export default async (userInfo) => {
  if (!isObject(userInfo)) throw new BadRequestError(i18n('errors.api.users.create.invalidUserInfo'))
  if (!userInfo.username) throw new BadRequestError(i18n('errors.api.users.usernameRequired'))
  if (!userInfo.email) throw new BadRequestError(i18n('errors.api.users.emailRequired'))

  let user = { ...userInfo }
  delete user.id

  const exists = await getOneUserByUsername(user.username)
  if (exists) throw new ConflictError(i18n('user.errors.exists'))

  user.id = uuid()
  user = await UsersModel.create({ ...user })
  return { ...user, password: undefined }
}
