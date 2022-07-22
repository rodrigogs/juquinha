import '@juquinha/config/env.mjs'
import create from './create.mjs'
import update from './update.mjs'
import findOneById from './get-one-by-id.mjs'
import faker from 'faker'

describe('UsersService', () => {
  it('#update', async () => {
    const createdUser = await create({
      name: global.createRandomName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      picture: faker.internet.avatar(),
    })
    expect(createdUser).toBeDefined()
    expect(createdUser.__version).toBe(0)
    const updatedUser = await update(createdUser.id, {
      name: global.createRandomName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      picture: faker.internet.avatar(),
    })
    const user = await findOneById(createdUser.id)
    expect(user).toBeInstanceOf(Object)
    expect(user.id).toBe(createdUser.id)
    expect(user.name).toBe(updatedUser.name)
    expect(user.username).toBe(updatedUser.username)
    expect(user.email).toBe(updatedUser.email)
    expect(user.picture).toBe(updatedUser.picture)
    expect(user.__version).toBe(1)
  })

  it('#update should break when updating the same document concurrently', async () => {
    expect.assertions(3)
    const createdUser = await create({
      name: global.createRandomName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      picture: faker.internet.avatar(),
    })
    expect(createdUser).toBeDefined()
    expect(createdUser.__version).toBe(0)
    const updateUser = () => update(createdUser.id, {
      name: global.createRandomName(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      picture: faker.internet.avatar(),
    })
    try {
      await Promise.all([
        updateUser(),
        updateUser(),
        updateUser(),
        updateUser(),
      ])
    } catch (err) {
      expect(err.message).toBe('The record has been updated by another user')
    }
  })
})
