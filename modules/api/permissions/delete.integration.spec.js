import 'config/env'
import faker from 'faker'
import PermissionsService from 'lib/services/permissions'
import RolesService from 'lib/services/roles'
import RolePermissionsService from 'lib/services/role-permissions'
import { handler } from './delete'

const TYPES = ['ALLOW', 'DENY']
const METHODS = ['ALL', 'GET', 'POST', 'PUT', 'DELETE']

describe('API', () => {
  it('permissions delete', async () => {
    try {
      const permission = await PermissionsService.create({
        name: faker.name.firstName(),
        description: faker.name.lastName(),
        type: TYPES[Math.floor(Math.random() * TYPES.length)],
        method: METHODS[Math.floor(Math.random() * METHODS.length)],
        path: faker.internet.url(),
      })
      const event = {
        path: `/permissions/${permission.id}`,
        httpMethod: 'DELETE',
        pathParameters: { id: permission.id },
      }

      const context = {}

      const response = await handler(event, context)
      expect(response.statusCode).toBe(204)
    } catch (debugMe) {
      console.log(debugMe)
      throw debugMe
    }
  })

  it('permissions removePermissionRole', async () => {
    try {
      const roleName = faker.name.firstName()
      const roleDescription = faker.name.lastName()
      const permission = (await PermissionsService.list({ limit: 1 })).data[0]
      const role = await RolesService.create({ name: roleName, description: roleDescription })
      await RolePermissionsService.create({ roleId: role.id, permissionId: permission.id })

      const event = {
        path: `/permissions/${permission.id}/roles/${role.id}`,
        httpMethod: 'DELETE',
        pathParameters: { id: permission.id, roleId: role.id },
      }

      const context = {}

      const response = await handler(event, context)
      expect(response.statusCode).toBe(204)
    } catch (debugMe) {
      console.log(debugMe)
      throw debugMe
    }
  })
})
