import { v4 as createId } from 'uuid'
import ConflictError from '@juquinha/lib/errors/api/conflict.mjs'
import i18n from '@juquinha/lib/i18n/index.mjs'
import getOneByName from '@juquinha/lib/helpers/crud-service-builder/get-one-by-name.mjs'
import PermissionsModel from '@juquinha/lib/models/permissions.mjs'

export default async (permission) => {
  permission = { id: createId(), ...permission }
  const permissionExists = await getOneByName('permissions')(permission.name)
  if (permissionExists) {
    throw new ConflictError(i18n('permissions.errors.exists'))
  }
  return PermissionsModel.create(permission)
}
