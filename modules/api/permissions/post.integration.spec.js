import 'config/env'
import faker from 'faker'
import PermissionsService from 'lib/services/permissions'
import RolesService from 'lib/services/roles'
import RolePermissionsService from 'lib/services/role-permissions'
import { handler } from './post'

const TYPES = ['ALLOW', 'DENY']
const METHODS = ['ALL', 'GET', 'POST', 'PUT', 'DELETE']

describe('API: Permissions(POST)', () => {
  it('create', async () => {
    try {
      const payload = {
        name: faker.name.firstName(),
        description: faker.name.lastName(),
        type: TYPES[Math.floor(Math.random() * TYPES.length)],
        method: METHODS[Math.floor(Math.random() * METHODS.length)],
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
    } catch (debugMe) {
      console.log(debugMe)
      throw debugMe
    }
  })

  it('removePermissionRole', async () => {
    const permission = await PermissionsService.create({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      description: faker.random.words(),
      type: TYPES[Math.floor(Math.random() * TYPES.length)],
      method: METHODS[Math.floor(Math.random() * METHODS.length)],
      path: faker.internet.url(),
    })
    const role = await RolesService.create({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      description: faker.random.words(),
    })
    await RolePermissionsService.create({
      roleId: role.id,
      permissionId: permission.id,
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
