import faker from 'faker'
import '@juquinha/config/env.mjs'
import UsersService from '@juquinha/lib/services/users/index.mjs'
import { handler } from './put.mjs'

describe('API: Users(PUT)', () => {
  it('update', async () => {
    const payload = {
      username: global.createRandomName().split(' ').join('').toLowerCase().substring(0, 15),
      name: global.createRandomName(),
      email: faker.internet.email(),
      picture: faker.internet.url(),
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
        name: faker.lorem.words(3 + Math.floor(Math.random() * 7)),
        email: faker.internet.email(),
      }),
    }

    const context = {}

    const response = await handler(event, context)
    expect(response.statusCode).toBe(200)

    const user2 = await UsersService.getOneById(user.id)
    const body = JSON.parse(response.body)
    expect(user2.name).toBe(body.name)
    expect(user2.email).toBe(body.email)
  })
})
