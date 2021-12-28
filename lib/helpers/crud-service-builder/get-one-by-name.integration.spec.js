import 'config/env'
import list from './list'
import getOneByName from './get-one-by-name'

describe('CrudServiceBuilder', () => {
  it('#getOneById', async () => {
    const permission = (await list('permissions')({ limit: 1 })).data[0]
    if (!permission) throw new Error('No permission found')
    const result = await getOneByName('permissions')(permission.name)
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
