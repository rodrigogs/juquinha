import 'config/env'
import UserRolesModel from 'lib/models/user-roles'
import UsersModel from 'lib/models/users'
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
