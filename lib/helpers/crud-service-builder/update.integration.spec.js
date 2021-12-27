import 'config/env'
import faker from 'faker'
import list from './list'
import update from './update'

const TYPES = ['ALLOW', 'DENY']
const METHODS = ['ALL', 'GET', 'POST', 'PUT', 'DELETE']

describe('CrudServiceBuilder', () => {
  it('#update', async () => {
    try {
      const permission = (await list('permissions')({ limit: 1 })).data[0]
      const name = faker.name.findName()
      const description = faker.lorem.sentence()
      const type = TYPES[Math.floor(Math.random() * TYPES.length)]
      const method = METHODS[Math.floor(Math.random() * METHODS.length)]
      const path = faker.internet.url()
      const result = await update('permissions')(permission.id, {
        name,
        description,
        type,
        method,
        path,
      })
      expect(result).toBeDefined()
      expect(result.name).toBe(name)
      expect(result.description).toBe(description)
      expect(result.type).toBe(type)
      expect(result.method).toBe(method)
      expect(result.path).toBe(path)
    } catch (debugMe) {
      console.log(debugMe)
      throw debugMe
    }
  })
})
