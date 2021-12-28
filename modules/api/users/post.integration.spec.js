import 'config/env'
import faker from 'faker'
import UsersService from 'lib/services/users'
import RolesService from 'lib/services/roles'
import UserRolesService from 'lib/services/user-roles'
import { handler } from './post'

describe('API: Users(POST)', () => {
  it('create', async () => {
    const payload = {
      username: faker.lorem.words(3 + Math.floor(Math.random() * 7)).replace(/ /g, '').substring(0, 15),
      name: faker.lorem.words(3 + Math.floor(Math.random() * 7)),
      email: faker.internet.email(),
      picture: faker.internet.url(),
    }
    const event = {
      path: '/users',
      httpMethod: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }

    const context = {}

    const response = await handler(event, context)
    expect(response.statusCode).toBe(201)
  }, 10000)

  it('removeRole', async () => {
    const user = await UsersService.create({
      username: faker.lorem.words(3 + Math.floor(Math.random() * 7)).replace(/ /g, '').substring(0, 15),
      name: faker.lorem.words(3 + Math.floor(Math.random() * 7)),
      email: faker.internet.email(),
      picture: faker.internet.url(),
    })
    const role = await RolesService.create({
      name: faker.lorem.words(3 + Math.floor(Math.random() * 7)),
      description: faker.random.words(),
    })
    await UserRolesService.create({
      userId: user.id,
      roleId: role.id,
    })
    const event = {
      path: `/users/${user.id}/roles`,
      pathParameters: {
        id: user.id,
      },
      httpMethod: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        roleId: role.id,
      }),
    }

    const context = {}

    const response = await handler(event, context)
    expect(response.statusCode).toBe(201)
  }, 10000)
})
