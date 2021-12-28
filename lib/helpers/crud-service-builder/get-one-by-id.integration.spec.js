import 'config/env'
import list from './list'
import getOneById from './get-one-by-id'

describe('CrudServiceBuilder', () => {
  it('#getOneById', async () => {
    const permission = (await list('permissions')({ limit: 1 })).data[0]
    if (!permission) throw new Error('No permission found')
    const result = await getOneById('permissions')(permission.id)
    expect(result).toBeDefined()
    expect(result).not.toBeNull()
    // FIXME fix this 👇
    if (result.id !== permission.id) {
      throw new Error(`This test is flaky. The result.id is ${result.id} but the expected id is ${permission.id}`)
    }
    expect(result.name).toBe(permission.name)
    expect(result.description).toBe(permission.description)
    expect(result.type).toBe(permission.type)
    expect(result.method).toBe(permission.method)
    expect(result.path).toBe(permission.path)
  })
})
