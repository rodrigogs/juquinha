import '@juquinha/config/env'
import create from './create'
import remove from './remove'
import getOneById from './get-one-by-id'
import faker from 'faker'

describe('UsersService', () => {
  it('#remove', async () => {
    const result = await create({
      name: global.createRandomName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      picture: faker.internet.avatar(),
    })
    await remove(result.id)
    const user = await getOneById(result.id)
    expect(user).toBe(undefined)
  }, 10000)
})
