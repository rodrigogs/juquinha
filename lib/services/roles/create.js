import { v4 as uuid } from 'uuid'
import RolesModel from 'lib/models/roles'
import getOneRoleByName from './get-one-by-name'
import ConflictError from 'lib/errors/api/conflict'
import i18n from 'lib/i18n'

export default async ({ name, description }) => {
  const role = { name, description }
  const exists = await getOneRoleByName(name)
  if (exists) throw new ConflictError(i18n('role.errors.exists'))

  role.id = uuid()

  return RolesModel.create(role)
}
