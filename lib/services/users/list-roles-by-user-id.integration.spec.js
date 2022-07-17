import '@juquinha/config/env'
import UserRolesModel from '@juquinha/lib/models/user-roles'
import UsersModel from '@juquinha/lib/models/users'
import listRolesByUserId from './list-roles-by-user-id'

describe('UsersService', () => {
  it('#listRolesByUserId', async () => {
    const [result] = await UserRolesModel.scan().limit(1).exec()
    const user = await UsersModel.get(result.userId)
    expect(user).toBeInstanceOf(Object)
    const roles = await listRolesByUserId(user.id)
    expect(roles.data[0]).toBeInstanceOf(Object)
  })
})
