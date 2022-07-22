import faker from 'faker'
import '@juquinha/config/env.mjs'
import RolesService from '@juquinha/lib/services/roles/index.mjs'
import { handler } from './put.mjs'

describe('API: Roles(PUT)', () => {
  it('update', async () => {
    const payload = {
      name: faker.lorem.words(3 + Math.floor(Math.random() * 8)),
      description: faker.name.lastName(),
    }
    const role = await RolesService.create(payload)
    const event = {
      path: `/roles/${role.id}`,
      httpMethod: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      pathParameters: { id: role.id },
      body: JSON.stringify({
        name: faker.lorem.words(3 + Math.floor(Math.random() * 8)),
        description: faker.name.lastName(),
      }),
    }

    const context = {}

    const response = await handler(event, context)
    expect(response.statusCode).toBe(200)

    const permission2 = await RolesService.getOneById(role.id)
    const body = JSON.parse(response.body)
    expect(permission2.name).toBe(body.name)
    expect(permission2.description).toBe(body.description)
  })
})
