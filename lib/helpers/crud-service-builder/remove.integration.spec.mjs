import '@juquinha/config/env.mjs'
import create from './create.mjs'
import getOneById from './get-one-by-id.mjs'
import remove from './remove.mjs'
import faker from 'faker'

const TYPES = ['ALLOW', 'DENY']
const METHODS = ['ALL', 'GET', 'POST', 'PUT', 'DELETE']

describe('CrudServiceBuilder', () => {
  it('#remove', async () => {
    const name = faker.name.findName()
    const description = faker.lorem.sentence()
    const type = TYPES[Math.floor(Math.random() * TYPES.length)]
    const method = METHODS[Math.floor(Math.random() * METHODS.length)]
    const path = faker.internet.url()
    const permission = await create('permissions')({
      name,
      description,
      type,
      method,
      path,
    })
    await remove('permissions')(permission.id)
    const missing = await getOneById('permissions')(permission.id)
    expect(missing).not.toBeDefined()
  })
})
