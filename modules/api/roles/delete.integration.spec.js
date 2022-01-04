import 'config/env'
import faker from 'faker'
import RolesService from 'lib/services/roles'
import UsersService from 'lib/services/users'
import UserRolesService from 'lib/services/user-roles'
import { handler } from './delete'

describe('API: Roles(DELETE)', () => {
  it('delete', async () => {
    const role = await RolesService.create({
      name: faker.lorem.words(3 + Math.floor(Math.random() * 8)),
      description: faker.lorem.sentence(),
    })
    const event = {
      path: `/roles/${role.id}`,
      httpMethod: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      pathParameters: { id: role.id },
    }

    const context = {}

    const response = await handler(event, context)
    expect(response.statusCode).toBe(204)
  })

  it('removePermissionRole', async () => {
    const role = await RolesService.create({
      name: global.createRandomName(),
      description: faker.lorem.sentence(),
    })
    const user = await UsersService.create({
      username: global.createRandomName().split(' ').join('').toLowerCase().substring(0, 15),
      name: global.createRandomName(),
      email: faker.internet.email(),
      picture: faker.internet.url(),
      password: faker.internet.password(),
    })
    await UserRolesService.create({ roleId: role.id, userId: user.id })

    const event = {
      path: `/roles/${role.id}/users/${user.id}`,
      httpMethod: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      pathParameters: { id: role.id, userId: user.id },
    }

    const context = {}

    const response = await handler(event, context)
    expect(response.statusCode).toBe(204)
  })
})
