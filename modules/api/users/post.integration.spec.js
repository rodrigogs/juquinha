import '@juquinha/config/env'
import faker from 'faker'
import UsersService from '@juquinha/lib/services/users'
import RolesService from '@juquinha/lib/services/roles'
import UserRolesService from '@juquinha/lib/services/user-roles'
import { handler } from './post'

describe('API: Users(POST)', () => {
  it('create', async () => {
    const payload = {
      username: global.createRandomName().split(' ').join('').toLowerCase().substring(0, 15),
      name: global.createRandomName(),
      email: faker.internet.email(),
      picture: faker.internet.url(),
      password: faker.internet.password(),
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
      username: global.createRandomName().split(' ').join('').toLowerCase().substring(0, 15),
      name: global.createRandomName(),
      email: faker.internet.email(),
      picture: faker.internet.url(),
      password: faker.internet.password(),
    })
    const role = await RolesService.create({
      name: global.createRandomName(),
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
