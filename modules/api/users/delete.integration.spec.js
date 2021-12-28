import 'config/env'
import faker from 'faker'
import UsersService from 'lib/services/users'
import RolesService from 'lib/services/roles'
import UserRolesService from 'lib/services/user-roles'
import { handler } from './delete'

describe('API: Users(DELETE)', () => {
  it('delete', async () => {
    const user = await UsersService.create({
      username: faker.lorem.words(3 + Math.floor(Math.random() * 7)).replace(/ /g, '').substring(0, 15),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      email: faker.internet.email(),
      picture: faker.internet.url(),
    })
    const event = {
      path: `/users/${user.id}`,
      httpMethod: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      pathParameters: { id: user.id },
    }

    const context = {}

    const response = await handler(event, context)
    expect(response.statusCode).toBe(204)
  })

  it('removePermissionRole', async () => {
    const roleName = faker.name.firstName()
    const roleDescription = faker.name.lastName()
    const user = (await UsersService.list({ limit: 1 })).data[0]
    const role = await RolesService.create({ name: roleName, description: roleDescription })
    await UserRolesService.create({ roleId: role.id, userId: user.id })

    const event = {
      path: `/users/${user.id}/roles/${role.id}`,
      httpMethod: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      pathParameters: { id: user.id, roleId: role.id },
    }

    const context = {}

    const response = await handler(event, context)
    expect(response.statusCode).toBe(204)
  })
})
