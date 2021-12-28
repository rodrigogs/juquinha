import 'config/env'
import faker from 'faker'
import PermissionsService from 'lib/services/permissions'
import { handler } from './put'

const TYPES = ['ALLOW', 'DENY']
const METHODS = ['ALL', 'GET', 'POST', 'PUT', 'DELETE']

describe('API: Permissions(PUT)', () => {
  it('update', async () => {
    const payload = {
      name: faker.lorem.words(3 + Math.floor(Math.random() * 8)),
      description: faker.lorem.sentence(),
      type: TYPES[Math.floor(Math.random() * TYPES.length)],
      method: METHODS[Math.floor(Math.random() * METHODS.length)],
      path: faker.internet.url(),
    }
    const permission = await PermissionsService.create(payload)
    const event = {
      path: `/permissions/${permission.id}`,
      httpMethod: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      pathParameters: { id: permission.id },
      body: JSON.stringify({
        name: faker.lorem.words(3 + Math.floor(Math.random() * 8)),
        description: faker.name.lastName(),
        type: TYPES[Math.floor(Math.random() * TYPES.length)],
        method: METHODS[Math.floor(Math.random() * METHODS.length)],
        path: faker.internet.url(),
      }),
    }

    const context = {}

    const response = await handler(event, context)
    expect(response.statusCode).toBe(200)

    const permission2 = await PermissionsService.getOneById(permission.id)
    const body = JSON.parse(response.body)
    expect(permission2.name).toBe(body.name)
    expect(permission2.description).toBe(body.description)
    expect(permission2.type).toBe(body.type)
    expect(permission2.method).toBe(body.method)
    expect(permission2.path).toBe(body.path)
  })
})
