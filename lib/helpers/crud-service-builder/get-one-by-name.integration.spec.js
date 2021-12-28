import 'config/env'
import list from './list'
import getOneByName from './get-one-by-name'

describe('CrudServiceBuilder', () => {
  it('#getOneById', async () => {
    const permission = (await list('permissions')({ limit: 1 })).data[0]
    const result = await getOneByName('permissions')(permission.name)
    expect(result).toBeDefined()
    expect(result.name).toBe(permission.name)
    expect(result.description).toBe(permission.description)
    expect(result.type).toBe(permission.type)
    expect(result.method).toBe(permission.method)
    expect(result.path).toBe(permission.path)
  })
})
