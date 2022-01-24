import 'config/env'
import faker from 'faker'
import UsersService from 'lib/services/users'
import RolesService from 'lib/services/roles'
import UserRolesService from 'lib/services/user-roles'
import { handler } from './get'

describe('API: Users(GET)', () => {
  it('list', async () => {
    const event = {
      path: '/users',
      httpMethod: 'GET',
    }

    const context = {}

    const response = await handler(event, context)
    expect(response.statusCode).toBe(200)
    expect(typeof response.body).toBe('string')
    const responseBody = JSON.parse(response.body)
    expect(responseBody.data).toBeInstanceOf(Array)
    expect(responseBody.data[0]).toBeInstanceOf(Object)
    expect(responseBody.data[0].id).toBeDefined()
    expect(responseBody.data[0].username).toBeDefined()
    expect(responseBody.data[0].name).toBeDefined()
    expect(responseBody.data[0].email).toBeDefined()
  })

  it('getOneById', async () => {
    const user = await UsersService.create({
      username: global.createRandomName().split(' ').join('').toLowerCase().substring(0, 15),
      name: global.createRandomName(),
      email: faker.internet.email(),
      picture: faker.internet.url(),
      password: faker.internet.password(),
    })
    const event = {
      path: `/users/id/${user.id}`,
      httpMethod: 'GET',
      pathParameters: { id: user.id },
    }

    const context = {}

    const response = await handler(event, context)
    expect(response.statusCode).toBe(200)
  })

  it('getRolesByUserId', async () => {
    const roleName = faker.lorem.words(3 + Math.floor(Math.random() * 8))
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
      path: `/users/${user.id}/roles`,
      httpMethod: 'GET',
      pathParameters: { id: user.id },
    }

    const context = {}

    const response = await handler(event, context)
    expect(response.statusCode).toBe(200)
    const body = JSON.parse(response.body)
    expect(body.data.length).toBeGreaterThan(0)
  })
})
