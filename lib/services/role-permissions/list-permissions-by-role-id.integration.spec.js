import '@juquinha/config/env'
import RolesService from '@juquinha/lib/services/roles'
import PermissionsService from '@juquinha/lib/services/permissions'
import createRolePermission from './create'
import listPermissionsByRoleId from './list-permissions-by-role-id'
import faker from 'faker'

describe('RolePermissionsService', () => {
  it('#listPermissionsByRoleId', async () => {
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
    await createRolePermission({
      roleId: role.id,
      permissionId: permission.id,
    })
    const { data: result } = await listPermissionsByRoleId(role.id)
    expect(result).toBeInstanceOf(Array)
    expect(result.length).toBe(1)
    expect(result[0].id).toBe(permission.id)
  })
})
