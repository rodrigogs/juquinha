import 'config/env'
import faker from 'faker'
import PermissionsService from 'lib/services/permissions'
import { handler } from './put'

describe('API: Permissions(PUT)', () => {
  it('update', async () => {
    const payload = {
      name: global.createRandomName(),
      description: faker.lorem.sentence(),
      type: global.PERMISSION_TYPES[Math.floor(Math.random() * global.PERMISSION_TYPES.length)],
      method: global.PERMISSION_METHODS[Math.floor(Math.random() * global.PERMISSION_METHODS.length)],
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
        name: global.createRandomName(),
        description: faker.name.lastName(),
        type: global.PERMISSION_TYPES[Math.floor(Math.random() * global.PERMISSION_TYPES.length)],
        method: global.PERMISSION_METHODS[Math.floor(Math.random() * global.PERMISSION_METHODS.length)],
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
