import 'config/env'
import list from './list'
import getOneById from './get-one-by-id'

describe('CrudServiceBuilder', () => {
  it('#getOneById', async () => {
    try {
      const permission = (await list('permissions')({ limit: 1 })).data[0]
      const result = await getOneById('permissions')(permission.id)
      expect(result).toBeDefined()
      expect(result.name).toBe(permission.name)
      expect(result.description).toBe(permission.description)
      expect(result.type).toBe(permission.type)
      expect(result.method).toBe(permission.method)
      expect(result.path).toBe(permission.path)
    } catch (debugMe) {
      console.log(debugMe)
      throw debugMe
    }
  })
})
