import '@juquinha/config/env.mjs'
import CrudServiceBuilder from './index.mjs'

describe('CrudServiceBuilder', () => {
  it('#forEntity', async () => {
    const crudServiceBuilder = new CrudServiceBuilder()
    crudServiceBuilder.forEntity('permissions')
    const service = crudServiceBuilder.buildMethods().build()
    expect(service).toBeDefined()
    expect(service.name).toBe('PermissionsService')
    expect(service.create).toBeInstanceOf(Function)
    expect(service.getOneById).toBeInstanceOf(Function)
    expect(service.getOneByName).toBeInstanceOf(Function)
  })
})
