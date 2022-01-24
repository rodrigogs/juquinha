import 'config/env'
import faker from 'faker'
import update from './update'
import create from './create'
import findOneById from './get-one-by-id'

const TYPES = ['ALLOW', 'DENY']
const METHODS = ['ALL', 'GET', 'POST', 'PUT', 'DELETE']

describe('CrudServiceBuilder', () => {
  it('#update', async () => {
    const permission = await create('permissions')({
      name: global.createRandomName(),
      description: faker.lorem.words(3 + Math.floor(Math.random() * 8)),
      type: global.PERMISSION_TYPES[Math.floor(Math.random() * global.PERMISSION_TYPES.length)],
      method: global.PERMISSION_METHODS[Math.floor(Math.random() * global.PERMISSION_METHODS.length)],
      path: faker.internet.url(),
    })
    const name = faker.name.findName()
    const description = faker.lorem.sentence()
    const type = TYPES[Math.floor(Math.random() * TYPES.length)]
    const method = METHODS[Math.floor(Math.random() * METHODS.length)]
    const path = faker.internet.url()
    await update('permissions')(permission.id, {
      name,
      description,
      type,
      method,
      path,
    })
    const result = await findOneById('permissions')(permission.id)
    expect(result).toBeDefined()
    expect(result.name).toBe(name)
    expect(result.description).toBe(description)
    expect(result.type).toBe(type)
    expect(result.method).toBe(method)
    expect(result.path).toBe(path)
  })
})
