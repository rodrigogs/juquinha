import '@juquinha/config/env.mjs'
import UserRolesModel from '@juquinha/lib/models/user-roles.mjs'
import RolesModel from '@juquinha/lib/models/roles.mjs'
import listUsersByRoleId from './list-users-by-role-id.mjs'

describe('UsersService', () => {
  it('#listUsersByRoleId', async () => {
    const [result] = await UserRolesModel.scan().limit(1).exec()
    const role = await RolesModel.get(result.roleId)
    expect(role).toBeInstanceOf(Object)
    const users = await listUsersByRoleId(role.id)
    expect(users.data[0]).toBeInstanceOf(Object)
  })
})
