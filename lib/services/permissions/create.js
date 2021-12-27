import { v4 as createId } from 'uuid'
import ConflictError from 'lib/errors/api/conflict'
import i18n from 'lib/i18n'
import getOneByName from 'lib/helpers/crud-service-builder/get-one-by-name'
import * as PermissionsModel from 'lib/models/permissions'

export default async (permission) => {
  permission = { id: createId(), ...permission }
  const permissionExists = await getOneByName('permissions')(permission.name)
  if (permissionExists) {
    throw new ConflictError(
      i18n('A permission with name "{{permissionName}}" already exists', {
        permissionName: permission.name,
      }),
    )
  }
  return PermissionsModel.create(permission)
}
