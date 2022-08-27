import { v4 as uuid } from 'uuid'
import RolesModel from '@juquinha/lib/models/roles.mjs'
import getOneRoleByName from './get-one-by-name.mjs'
import ConflictError from '../../errors/api/conflict.mjs'
import BadRequestError from '@juquinha/lib/errors/api/bad-request.mjs'
import i18n from '@juquinha/lib/i18n/index.mjs'
import { isObject } from '@juquinha/lib/common/helpers/object.mjs'

export default async (roleInfo) => {
  if (!isObject(roleInfo)) throw new BadRequestError(i18n('errors.api.roles.create.invalidRoleInfo'))
  if (!roleInfo.name) throw new BadRequestError(i18n('errors.api.roles.nameRequired'))

  let role = { ...roleInfo }
  delete role.id

  const exists = await getOneRoleByName(role.name)
  if (exists) throw new ConflictError(i18n('roles.errors.exists'))

  role.id = uuid()
  role = await RolesModel.create({ ...role })

  return { ...role }
}