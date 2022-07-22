import '@juquinha/config/env.mjs'
import UserRolesModel from '@juquinha/lib/models/user-roles.mjs'
import UsersModel from '@juquinha/lib/models/users.mjs'
import listRolesByUserId from './list-roles-by-user-id.mjs'

describe('UsersService', () => {
  it('#listRolesByUserId', async () => {
    const [result] = await UserRolesModel.scan().limit(1).exec()
    const user = await UsersModel.get(result.userId)
    expect(user).toBeInstanceOf(Object)
    const roles = await listRolesByUserId(user.id)
    expect(roles.data[0]).toBeInstanceOf(Object)
  })
})
