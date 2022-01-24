import 'config/env'
import list from './list'

describe('RolesService', () => {
  it('#list', async () => {
    const Roles = await list()
    expect(Roles.data[0]).toBeInstanceOf(Object)
  })
})
