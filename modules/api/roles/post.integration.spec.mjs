import faker from 'faker'
import '@juquinha/config/env.mjs'
import PermissionsService from '@juquinha/lib/services/permissions/index.mjs'
import RolesService from '@juquinha/lib/services/roles/index.mjs'
import RolePermissionsService from '@juquinha/lib/services/role-permissions/index.mjs'
import { handler } from './post.mjs'

describe('API: Roles(POST)', () => {
  it('create', async () => {
    const payload = {
      name: faker.lorem.words(3 + Math.floor(Math.random() * 8)),
      description: faker.lorem.words(3 + Math.floor(Math.random() * 8)),
    }
    const event = {
      path: '/roles',
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

  it('removePermissionRole', async () => {
    const role = await RolesService.create({
      name: global.createRandomName(),
      description: faker.random.words(),
    })
    const permission = await PermissionsService.create({
      name: global.createRandomName(),
      description: faker.random.words(),
      type: global.PERMISSION_TYPES[Math.floor(Math.random() * global.PERMISSION_TYPES.length)],
      method: global.PERMISSION_METHODS[Math.floor(Math.random() * global.PERMISSION_METHODS.length)],
      path: faker.internet.url(),
    })
    await RolePermissionsService.create({
      permissionId: permission.id,
      roleId: role.id,
    })
    const event = {
      path: `/roles/${role.id}/permissions`,
      pathParameters: {
        id: role.id,
      },
      httpMethod: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        permissionId: permission.id,
      }),
    }
    const context = {}

    const response = await handler(event, context)
    expect(response.statusCode).toBe(201)
  })
})
