import '@juquinha/config/env'
import UsersService from '@juquinha/lib/services/users'
import RolesService from '@juquinha/lib/services/roles'
import createUserRoles from './create'
import listUsersByRoleId from './list-users-by-role-id'
import remove from './remove'
import faker from 'faker'

describe('UserRolesService', () => {
  it('#remove', async () => {
    const user = await UsersService.create({
      name: global.createRandomName(),
      username: global.createRandomName().toLowerCase().replace(/\s/g, ''),
      email: faker.internet.email(),
    })
    const role = await RolesService.create({
      name: global.createRandomName(),
      description: faker.lorem.sentence(),
    })
    await createUserRoles({
      userId: user.id,
      roleId: role.id,
    })
    const { data: result } = await listUsersByRoleId(role.id)
    expect(result).toBeInstanceOf(Array)
    expect(result.length).toBe(1)
    expect(result[0].id).toBe(user.id)
    await remove({
      userId: user.id,
      roleId: role.id,
    })
    const { data: result2 } = await listUsersByRoleId(role.id)
    expect(result2).toBeInstanceOf(Array)
    expect(result2.length).toBe(0)
  })
})
