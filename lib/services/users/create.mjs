import { v4 as uuid } from 'uuid'
import UsersModel from '@juquinha/lib/models/users.mjs'
import getOneUserByUsername from './get-one-by-username.mjs'
import ConflictError from '@juquinha/lib/errors/api/conflict.mjs'
import BadRequestError from '@juquinha/lib/errors/api/bad-request.mjs'
import i18n from '@juquinha/lib/i18n/index.mjs'
import { isObject } from '@juquinha/lib/common/helpers/object.mjs'

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
