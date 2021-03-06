import UsersModel from 'lib/models/users'
import UserRolesModel from 'lib/models/user-roles'
import ConflictError from 'lib/errors/api/conflict'
import i18n from 'lib/i18n'

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
