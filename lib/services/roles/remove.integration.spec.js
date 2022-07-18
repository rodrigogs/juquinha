import '@juquinha/config/env'
import create from './create.mjs'
import remove from './remove.mjs'
import getOneById from './get-one-by-id.mjs'
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
