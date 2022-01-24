import 'config/env'
import list from './list'

describe('UsersService', () => {
  it('#list', async () => {
    const users = await list()
    expect(users.data[0]).toBeInstanceOf(Object)
    expect(users.data[0].id).toBeDefined()
    expect(users.data[0].username).toBeDefined()
    expect(users.data[0].name).toBeDefined()
    expect(users.data[0].email).toBeDefined()
  })
})
