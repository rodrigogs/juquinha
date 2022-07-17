import '@juquinha/config/env'
import createPermission from './create'
import faker from 'faker'

describe('PermissionsService', () => {
  it('#create', async () => {
    const permission = {
      name: global.createRandomName(),
      description: faker.lorem.sentence(),
      type: global.PERMISSION_TYPES[Math.floor(Math.random() * global.PERMISSION_TYPES.length)],
      method: global.PERMISSION_METHODS[Math.floor(Math.random() * global.PERMISSION_METHODS.length)],
      path: faker.internet.url(),
    }
    const result = await createPermission(permission)
    expect(result).toBeInstanceOf(Object)
    expect(result.id).toBeDefined()
    expect(result.name).toBe(permission.name)
    expect(result.description).toBe(permission.description)
    expect(result.type).toBe(permission.type)
    expect(result.method).toBe(permission.method)
    expect(result.path).toBe(permission.path)
  })
})
