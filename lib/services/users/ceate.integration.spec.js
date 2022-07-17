import '@juquinha/config/env'
import createUser from './create'
import faker from 'faker'

describe('UsersService', () => {
  it('#create', async () => {
    const user = {
      name: global.createRandomName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      picture: faker.internet.avatar(),
    }
    const result = await createUser(user)
    expect(result).toBeInstanceOf(Object)
    expect(result.id).toBeDefined()
    expect(result.name).toBe(user.name)
    expect(result.username).toBe(user.username)
    expect(result.email).toBe(user.email)
    expect(result.picture).toBe(user.picture)
  })
})
