import '@juquinha/config/env.mjs'
import RolesService from '@juquinha/lib/services/roles/index.mjs'
import PermissionsService from '@juquinha/lib/services/permissions/index.mjs'
import createRolePermission from './create.mjs'
import listRolesByPermissionId from './list-roles-by-permission-id.mjs'
import faker from 'faker'

describe('RolePermissionsService', () => {
  it('#listRolePermissionsByRoleId', async () => {
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
    const { data: result } = await listRolesByPermissionId(permission.id)
    expect(result).toBeInstanceOf(Array)
    expect(result.length).toBe(1)
    expect(result[0].id).toBe(role.id)
  })
})
