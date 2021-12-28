import 'config/env'
import faker from 'faker'
// import PermissionsService from 'lib/services/permissions'
// import RolesService from 'lib/services/roles'
// import RolePermissionsService from 'lib/services/role-permissions'
import { handler } from './post'

// const TYPES = ['ALLOW', 'DENY']
// const METHODS = ['ALL', 'GET', 'POST', 'PUT', 'DELETE']

describe('API: Roles(POST)', () => {
  it('create', async () => {
    const payload = {
      name: faker.lorem.words(3 + Math.floor(Math.random() * 8)),
      description: faker.lorem.words(3 + Math.floor(Math.random() * 8)),
    }
    const event = {
      path: '/roles',
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
  //   const role = await RolesService.create({
  //     name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  //     description: faker.random.words(),
  //   })
  //   const permission = await PermissionsService.create({
  //     name: `${faker.name.firstName()} ${faker.name.lastName()}`,
  //     description: faker.random.words(),
  //     type: TYPES[Math.floor(Math.random() * TYPES.length)],
  //     method: METHODS[Math.floor(Math.random() * METHODS.length)],
  //     path: faker.internet.url(),
  //   })
  //   await RolePermissionsService.create({
  //     permissionId: permission.id,
  //     roleId: role.id,
  //   })
  //   const event = {
  //     path: `/roles/${role.id}/permissions`,
  //     pathParameters: {
  //       id: role.id,
  //     },
  //     httpMethod: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       permissionId: permission.id,
  //     }),
  //   }
  //   const context = {}

  //   const response = await handler(event, context)
  //   expect(response.statusCode).toBe(201)
  // })
})
