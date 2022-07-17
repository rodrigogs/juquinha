import '@juquinha/config/env'
import UsersService from '@juquinha/lib/services/users'
import RolesService from '@juquinha/lib/services/roles'
import createUserRole from './create'
import listRolesByUserId from './list-roles-by-user-id'
import faker from 'faker'

describe('UserRolesService', () => {
  it('#listUsersByRoleId', async () => {
    const user = await UsersService.create({
      name: global.createRandomName(),
      username: global.createRandomName().toLowerCase().replace(/\s/g, ''),
      email: faker.internet.email(),
    })
    const role = await RolesService.create({
      name: global.createRandomName(),
      description: faker.lorem.sentence(),
    })
    await createUserRole({
      userId: user.id,
      roleId: role.id,
    })
    const { data: result } = await listRolesByUserId(user.id)
    expect(result).toBeInstanceOf(Array)
  })
})
