import '@juquinha/config/env'
import createRole from './create'
import faker from 'faker'

describe('RolesService', () => {
  it('#create', async () => {
    const role = {
      name: global.createRandomName(),
      description: faker.lorem.sentence(),
    }
    const result = await createRole(role)
    expect(result).toBeInstanceOf(Object)
    expect(result.id).toBeDefined()
    expect(result.name).toBe(role.name)
    expect(result.description).toBe(role.description)
  })
})
