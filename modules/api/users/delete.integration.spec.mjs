import faker from 'faker'
import '@juquinha/config/env.mjs'
import UsersService from '@juquinha/lib/services/users/index.mjs'
import RolesService from '@juquinha/lib/services/roles/index.mjs'
import UserRolesService from '@juquinha/lib/services/user-roles/index.mjs'
import { handler } from './delete.mjs'

describe('API: Users(DELETE)', () => {
  it('delete', async () => {
    const user = await UsersService.create({
      username: global.createRandomName().split(' ').join('').toLowerCase().substring(0, 15),
      name: global.createRandomName(),
      email: faker.internet.email(),
      picture: faker.internet.url(),
      password: faker.internet.password(),
    })
    const event = {
      path: `/users/${user.id}`,
      httpMethod: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      pathParameters: { id: user.id },
    }

    const context = {}

    const response = await handler(event, context)
    expect(response.statusCode).toBe(204)
  })

  it('removePermissionRole', async () => {
    const roleName = faker.lorem.words(3 + Math.floor(Math.random() * 7))
    const roleDescription = faker.name.lastName()
    const user = await UsersService.create({
      username: global.createRandomName().split(' ').join('').toLowerCase().substring(0, 15),
      name: global.createRandomName(),
      email: faker.internet.email(),
      picture: faker.internet.url(),
      password: faker.internet.password(),
    })
    const role = await RolesService.create({ name: roleName, description: roleDescription })
    await UserRolesService.create({ roleId: role.id, userId: user.id })

    const event = {
      path: `/users/${user.id}/roles/${role.id}`,
      httpMethod: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      pathParameters: { id: user.id, roleId: role.id },
    }

    const context = {}

    const response = await handler(event, context)
    expect(response.statusCode).toBe(204)
  })
})