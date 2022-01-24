import 'config/env'
import RolesService from 'lib/services/roles'
import PermissionsService from 'lib/services/permissions'
import createRolePermission from './create'
import faker from 'faker'

describe('RolePermissionsService', () => {
  it('#create', async () => {
    const role = await RolesService.create({
      name: global.createRandomName(),
      description: faker.lorem.sentence(),
    })
    const permission = await PermissionsService.create({
      name: global.createRandomName(),
      description: faker.lorem.sentence(),
      type: global.PERMISSION_TYPES[Math.floor(Math.random() * global.PERMISSION_TYPES.length)],
      method: global.PERMISSION_METHODS[Math.floor(Math.random() * global.PERMISSION_METHODS.length)],
      path: faker.internet.url(),
    })
    const result = await createRolePermission({
      roleId: role.id,
      permissionId: permission.id,
    })
    expect(result).toBeInstanceOf(Object)
    expect(result.roleId).toBe(role.id)
    expect(result.permissionId).toBe(permission.id)
  })
})
