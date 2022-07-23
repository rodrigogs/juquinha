import faker from 'faker'
import '@juquinha/config/env.mjs'
import PermissionsService from '@juquinha/lib/services/permissions/index.mjs'
import RolesService from '@juquinha/lib/services/roles/index.mjs'
import { handler } from './post.mjs'

describe('API: Permissions(POST)', () => {
  it('create', async () => {
    const payload = {
      name: global.createRandomName(),
      description: faker.name.lastName(),
      type: global.PERMISSION_TYPES[Math.floor(Math.random() * global.PERMISSION_TYPES.length)],
      method: global.PERMISSION_METHODS[Math.floor(Math.random() * global.PERMISSION_METHODS.length)],
      path: faker.internet.url(),
    }
    const event = {
      path: '/permissions',
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

  it('createPermissionRole', async () => {
    const permission = await PermissionsService.create({
      name: global.createRandomName(),
      description: faker.random.words(),
      type: global.PERMISSION_TYPES[Math.floor(Math.random() * global.PERMISSION_TYPES.length)],
      method: global.PERMISSION_METHODS[Math.floor(Math.random() * global.PERMISSION_METHODS.length)],
      path: faker.internet.url(),
    })
    const role = await RolesService.create({
      name: global.createRandomName(),
      description: faker.random.words(),
    })
    const event = {
      path: `/permissions/${permission.id}/roles`,
      pathParameters: {
        id: permission.id,
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
