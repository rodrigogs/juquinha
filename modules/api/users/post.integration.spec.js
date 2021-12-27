import 'config/env'
import faker from 'faker'
import UsersService from 'lib/services/users'
import RolesService from 'lib/services/roles'
import UserRolesService from 'lib/services/user-roles'
import { handler } from './post'

describe('API: Users(POST)', () => {
  it('create', async () => {
    const payload = {
      username: faker.internet.userName(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
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
  })

  it('removeRole', async () => {
    const user = await UsersService.create({
      username: faker.internet.userName(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      email: faker.internet.email(),
      picture: faker.internet.url(),
    })
    const role = await RolesService.create({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
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
  })
})
