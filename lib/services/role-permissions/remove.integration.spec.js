import 'config/env'
import RolesService from 'lib/services/roles'
import PermissionsService from 'lib/services/permissions'
import createRolePermission from './create'
import listRolesByPermissionId from './list-roles-by-permission-id'
import remove from './remove'

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
