import '@juquinha/config/env'
import faker from 'faker'
import create from './create'
import getOneById from './get-one-by-id'

describe('CrudServiceBuilder', () => {
  it('#getOneById', async () => {
    const permission = await create('permissions')({
      name: global.createRandomName(),
      description: faker.lorem.words(3 + Math.floor(Math.random() * 8)),
      type: global.PERMISSION_TYPES[Math.floor(Math.random() * global.PERMISSION_TYPES.length)],
      method: global.PERMISSION_METHODS[Math.floor(Math.random() * global.PERMISSION_METHODS.length)],
      path: faker.internet.url(),
    })
    const result = await getOneById('permissions')(permission.id)
    expect(result).toBeDefined()
    if (result === null) {
      throw new Error(`This test is flaky. The result is null for ${permission.name}.`)
    }
    if (result.name !== permission.name) {
      throw new Error(`This test is flaky. The result.name is ${result.name} but the expected name is ${permission.name}`)
    }
    expect(result.name).toBe(permission.name)
    expect(result.description).toBe(permission.description)
    expect(result.type).toBe(permission.type)
    expect(result.method).toBe(permission.method)
    expect(result.path).toBe(permission.path)
  })
})
