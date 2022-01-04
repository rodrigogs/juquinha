import 'config/env'
import CrudServiceBuilder from './index'

describe('CrudServiceBuilder', () => {
  it('#forEntity', async () => {
    const crudServiceBuilder = new CrudServiceBuilder()
    crudServiceBuilder.forEntity('permissions')
    const service = crudServiceBuilder.build()
    expect(service).toBeDefined()
    expect(service.name).toBe('PermissionsService')
    expect(service.create).toBeInstanceOf(Function)
    expect(service.getOneById).toBeInstanceOf(Function)
    expect(service.getOneByName).toBeInstanceOf(Function)
  })
})
