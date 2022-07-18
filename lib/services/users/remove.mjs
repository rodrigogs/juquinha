import UsersModel from '@juquinha/lib/models/users.mjs'
import UserRolesModel from '@juquinha/lib/models/user-roles.mjs'
import ConflictError from '../../errors/api/conflict.mjs'
import i18n from '@juquinha/lib/i18n/index.mjs'

export default async (id) => {
  const userRolesCount = await UserRolesModel.query('userId').eq(id).count().exec()
  if (userRolesCount > 0) {
    throw new ConflictError(
      i18n(
        "There are {{count}} {{entities}} for this {{entity}}, it's necessary to remove those before deleting the {{entity}}",
        {
          count: userRolesCount,
          entities: i18n('roles'),
          entity: i18n('user'),
        },
      ),
    )
  }
  await UsersModel.delete(id)
}
