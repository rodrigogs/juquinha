import { v4 as uuid } from 'uuid'
import RolesModel from 'lib/models/roles'
import getOneRoleByName from './get-one-by-name'
import ConflictError from 'lib/errors/api/conflict'
import BadRequestError from 'lib/errors/api/bad-request'
import i18n from 'lib/i18n'
import { isObject } from 'lib/common/helpers/object'

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
