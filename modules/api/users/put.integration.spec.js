import 'config/env'
import faker from 'faker'
import UsersService from 'lib/services/users'
import { handler } from './put'

describe('API: Users(PUT)', () => {
  it('update', async () => {
    const payload = {
      username: faker.lorem.words(3 + Math.floor(Math.random() * 7)).replace(/ /g, '').substring(0, 15),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      email: faker.internet.email(),
      password: faker.internet.password(),
    }
    const user = await UsersService.create(payload)
    const event = {
      path: `/users/${user.id}`,
      httpMethod: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      pathParameters: { id: user.id },
      body: JSON.stringify({
        name: faker.datatype.string(Math.floor(Math.random() * 15)),
        email: faker.internet.email(),
      }),
    }

    const context = {}

    const response = await handler(event, context)
    expect(response.statusCode).toBe(200)

    const user2 = await UsersService.getOneById(user.id)
    const body = JSON.parse(response.body)
    expect(user2.username).toBe(body.username)
    expect(user2.name).toBe(body.name)
    expect(user2.email).toBe(body.email)
  })
})
