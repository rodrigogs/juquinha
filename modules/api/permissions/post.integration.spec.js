import 'config/env'
import faker from 'faker'
// import PermissionsService from 'lib/services/permissions'
// import RolesService from 'lib/services/roles'
// import RolePermissionsService from 'lib/services/role-permissions'
import { handler } from './post'

describe('API: Permissions(POST)', () => {
  it('create', async () => {
    const payload = {
      name: global.createRandomName(),
      description: faker.name.lastName(),
      type: global.PERMISSION_TYPES[Math.floor(Math.random() * global.PERMISSION_TYPES.length)],
      method: global.PERMISSION_METHODS[Math.floor(Math.random() * global.PERMISSION_METHODS.length)],
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
  })

  // it('removePermissionRole', async () => {
  //   const permission = await PermissionsService.create({
  //     name: global.createRandomName(),
  //     description: faker.random.words(),
  //     type: global.PERMISSION_TYPES[Math.floor(Math.random() * global.PERMISSION_TYPES.length)],
  //     method: global.PERMISSION_METHODS[Math.floor(Math.random() * global.PERMISSION_METHODS.length)],
  //     path: faker.internet.url(),
  //   })
  //   const role = await RolesService.create({
  //     name: global.createRandomName(),
  //     description: faker.random.words(),
  //   })
  //   await RolePermissionsService.create({
  //     roleId: role.id,
  //     permissionId: permission.id,
  //   })
  //   const event = {
  //     path: `/permissions/${permission.id}/roles`,
  //     pathParameters: {
  //       id: permission.id,
  //     },
  //     httpMethod: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       roleId: role.id,
  //     }),
  //   }

  //   const context = {}

  //   const response = await handler(event, context)
  //   expect(response.statusCode).toBe(201)
  // })
})
