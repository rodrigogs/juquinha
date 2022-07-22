import '@juquinha/config/env.mjs'
import create from './create.mjs'
import remove from './remove.mjs'
import getOneById from '@juquinha/lib/helpers/crud-service-builder/get-one-by-id.mjs'
import faker from 'faker'

describe('PermissionsService', () => {
  it('#remove', async () => {
    const result = await create({
      name: global.createRandomName(),
      description: faker.lorem.sentence(),
      type: global.PERMISSION_TYPES[Math.floor(Math.random() * global.PERMISSION_TYPES.length)],
      method: global.PERMISSION_METHODS[Math.floor(Math.random() * global.PERMISSION_METHODS.length)],
      path: faker.internet.url(),
    })
    await remove(result.id)
    const permission = await getOneById('permissions')(result.id)
    expect(permission).toBe(undefined)
  })
})
