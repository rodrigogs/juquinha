import '@juquinha/config/env.mjs'
import UsersService from '@juquinha/lib/services/users/index.mjs'
import RolesService from '@juquinha/lib/services/roles/index.mjs'
import createUserRole from './create.mjs'
import faker from 'faker'

describe('UserRolesService', () => {
  it('#create', async () => {
    const user = await UsersService.create({
      name: global.createRandomName(),
      username: global.createRandomName().toLowerCase().replace(/\s/g, ''),
      email: faker.internet.email(),
      password: faker.internet.password(),
    })
    const role = await RolesService.create({
      name: global.createRandomName(),
      description: faker.lorem.sentence(),
    })
    const result = await createUserRole({
      userId: user.id,
      roleId: role.id,
    })
    expect(result).toBeInstanceOf(Object)
  })
})
