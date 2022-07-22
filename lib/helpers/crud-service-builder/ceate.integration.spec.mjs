import '@juquinha/config/env.mjs'
import create from './create.mjs'
import faker from 'faker'

const TYPES = ['ALLOW', 'DENY']
const METHODS = ['ALL', 'GET', 'POST', 'PUT', 'DELETE']

describe('CrudServiceBuilder', () => {
  it('#create', async () => {
    const name = faker.name.findName()
    const description = faker.lorem.sentence()
    const type = TYPES[Math.floor(Math.random() * TYPES.length)]
    const method = METHODS[Math.floor(Math.random() * METHODS.length)]
    const path = faker.internet.url()
    const result = await create('permissions')({
      name,
      description,
      type,
      method,
      path,
    })
    expect(result).toBeDefined()
    expect(result.name).toBe(name)
    expect(result.description).toBe(description)
    expect(result.type).toBe(type)
    expect(result.method).toBe(method)
    expect(result.path).toBe(path)
  })
})
