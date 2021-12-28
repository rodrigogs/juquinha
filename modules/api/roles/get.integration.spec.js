import 'config/env'
import faker from 'faker'
import RolesService from 'lib/services/roles'
import PermissionsService from 'lib/services/permissions'
import RolePermissionsService from 'lib/services/role-permissions'
import { handler } from './get'

const TYPES = ['ALLOW', 'DENY']
const METHODS = ['ALL', 'GET', 'POST', 'PUT', 'DELETE']

describe('API: Roles(GET)', () => {
  it('list', async () => {
    const event = {
      resource: '/roles',
      path: '/roles',
      httpMethod: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const context = {}

    const response = await handler(event, context)
    expect(response.statusCode).toBe(200)
  })

  it('getOneById', async () => {
    const role = (await RolesService.list({ limit: 1 })).data[0]
    const event = {
      resource: '/roles/:id',
      path: `/roles/${role.id}`,
      httpMethod: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      pathParameters: { id: role.id },
    }

    const context = {}

    const response = await handler(event, context)
    expect(response.statusCode).toBe(200)
  })

  it('permissions getRolesByPermissionId', async () => {
    const role = (await RolesService.list({ limit: 1 })).data[0]
    const permission = await PermissionsService.create({
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      description: faker.lorem.sentence(),
      type: TYPES[Math.floor(Math.random() * TYPES.length)],
      method: METHODS[Math.floor(Math.random() * METHODS.length)],
      path: faker.internet.url(),
    })
    await RolePermissionsService.create({ roleId: role.id, permissionId: permission.id })

    const event = {
      resource: '/roles/:id/permissions',
      path: `/roles/${role.id}/permissions`,
      httpMethod: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      pathParameters: { id: role.id },
    }

    const context = {}

    const response = await handler(event, context)
    expect(response.statusCode).toBe(200)
    const body = JSON.parse(response.body)
    expect(body.data.length).toBeGreaterThan(0)
  })
})
