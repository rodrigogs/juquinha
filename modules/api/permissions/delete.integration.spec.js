import 'config/env'
import faker from 'faker'
import PermissionsService from 'lib/services/permissions'
import RolesService from 'lib/services/roles'
import RolePermissionsService from 'lib/services/role-permissions'
import { handler } from './delete'

describe('API: Permissions(DELETE)', () => {
  it('delete', async () => {
    const permission = await PermissionsService.create({
      name: global.createRandomName(),
      description: faker.lorem.words(3 + Math.floor(Math.random() * 8)),
      type: global.PERMISSION_TYPES[Math.floor(Math.random() * global.PERMISSION_TYPES.length)],
      method: global.PERMISSION_METHODS[Math.floor(Math.random() * global.PERMISSION_METHODS.length)],
      path: faker.internet.url(),
    })
    const event = {
      path: `/permissions/${permission.id}`,
      httpMethod: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      pathParameters: { id: permission.id },
    }

    const context = {}

    const response = await handler(event, context)
    expect(response.statusCode).toBe(204)
  })

  it('removePermissionRole', async () => {
    const roleName = global.createRandomName()
    const roleDescription = faker.name.lastName()
    const permission = await PermissionsService.create({
      name: global.createRandomName(),
      description: faker.lorem.words(3 + Math.floor(Math.random() * 8)),
      type: global.PERMISSION_TYPES[Math.floor(Math.random() * global.PERMISSION_TYPES.length)],
      method: global.PERMISSION_METHODS[Math.floor(Math.random() * global.PERMISSION_METHODS.length)],
      path: faker.internet.url(),
    })
    const role = await RolesService.create({ name: roleName, description: roleDescription })
    await RolePermissionsService.create({ roleId: role.id, permissionId: permission.id })

    const event = {
      path: `/permissions/${permission.id}/roles/${role.id}`,
      httpMethod: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      pathParameters: { id: permission.id, roleId: role.id },
    }

    const context = {}

    const response = await handler(event, context)
    expect(response.statusCode).toBe(204)
  })
})
