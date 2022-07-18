import '@juquinha/config/env.mjs'
import create from './create.mjs'
import update from './update.mjs'
import findOneById from './get-one-by-id.mjs'
import faker from 'faker'

describe('RolesService', () => {
  it('#update', async () => {
    const createdRole = await create({
      name: global.createRandomName(),
      description: faker.lorem.sentence(),
    })
    expect(createdRole).toBeDefined()
    expect(createdRole.__version).toBe(0)
    const updatedRole = await update(createdRole.id, {
      name: global.createRandomName(),
      description: faker.lorem.sentence(),
    })
    const role = await findOneById(createdRole.id)
    expect(role).toBeInstanceOf(Object)
    expect(role.id).toBe(createdRole.id)
    expect(role.name).toBe(updatedRole.name)
    expect(role.description).toBe(updatedRole.description)
    expect(role.__version).toBe(1)
  })

  it('#update should break when updating the same document concurrently', async () => {
    expect.assertions(3)
    const createdRole = await create({
      name: global.createRandomName(),
      description: faker.lorem.sentence(),
    })
    expect(createdRole).toBeDefined()
    expect(createdRole.__version).toBe(0)
    const updateRole = () => update(createdRole.id, {
      name: global.createRandomName(),
      description: faker.lorem.sentence(),
    })
    try {
      await Promise.all([
        updateRole(),
        updateRole(),
        updateRole(),
        updateRole(),
      ])
    } catch (err) {
      expect(err.message).toBe('The record has been updated by another user')
    }
  })
})
