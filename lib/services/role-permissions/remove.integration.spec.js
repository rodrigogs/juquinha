import '@juquinha/config/env.mjs'
import RolesService from '@juquinha/lib/services/roles/index.mjs'
import PermissionsService from '@juquinha/lib/services/permissions/index'
import createRolePermission from './create.mjs'
import listRolesByPermissionId from './list-roles-by-permission-id.mjs'
import remove from './remove.mjs'

describe('RolePermissionsService', () => {
  it('#remove', async () => {
    const role = await RolesService.create({
      name: global.createRandomName(),
      description: global.createRandomName(),
    })
    const permission = await PermissionsService.create({
      name: global.createRandomName(),
      description: global.createRandomName(),
      type: global.PERMISSION_TYPES[Math.floor(Math.random() * global.PERMISSION_TYPES.length)],
      method: global.PERMISSION_METHODS[Math.floor(Math.random() * global.PERMISSION_METHODS.length)],
      path: global.createRandomName(),
    })
    await createRolePermission({
      roleId: role.id,
      permissionId: permission.id,
    })
    const { data: result } = await listRolesByPermissionId(permission.id)
    expect(result).toBeInstanceOf(Array)
    expect(result.length).toBe(1)
    expect(result[0].id).toBe(role.id)
    await remove({
      roleId: role.id,
      permissionId: permission.id,
    })
    const { data: result2 } = await listRolesByPermissionId(permission.id)
    expect(result2).toBeInstanceOf(Array)
    expect(result2.length).toBe(0)
  })
})
