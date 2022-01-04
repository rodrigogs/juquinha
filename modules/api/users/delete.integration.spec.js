import 'config/env'
import faker from 'faker'
import UsersService from 'lib/services/users'
import RolesService from 'lib/services/roles'
import UserRolesService from 'lib/services/user-roles'
import { handler } from './delete'

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
