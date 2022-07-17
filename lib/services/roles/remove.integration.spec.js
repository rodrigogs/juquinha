import '@juquinha/config/env'
import create from './create'
import remove from './remove'
import getOneById from './get-one-by-id'
import faker from 'faker'

describe('RolesService', () => {
  it('#remove', async () => {
    const result = await create({
      name: global.createRandomName(),
      description: faker.lorem.sentence(),
    })
    await remove(result.id)
    const role = await getOneById(result.id)
    expect(role).toBe(undefined)
  })
})
