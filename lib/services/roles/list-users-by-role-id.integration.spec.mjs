import '@juquinha/config/env.mjs'
import UserRolesModel from '@juquinha/lib/models/user-roles.mjs'
import RolesModel from '@juquinha/lib/models/roles.mjs'
import listUsersById from './list-users-by-role-id.mjs'

describe('UsersRolesService', () => {
  it('#listRolesByUserId', async () => {
    const [result] = await UserRolesModel.scan().limit(1).exec()
    const role = await RolesModel.get(result.roleId)
    expect(role).toBeInstanceOf(Object)
    const users = await listUsersById(role.id)
    expect(users.data[0]).toBeInstanceOf(Object)
  })
})
