import '@juquinha/config/env.mjs'
import getOneByName from './get-one-by-name.mjs'
import RolesModel from '@juquinha/lib/models/roles.mjs'

describe('RolesService', () => {
  it('#getOneByName', async () => {
    const [result] = await RolesModel.scan().limit(1).exec()
    const role = await getOneByName(result.name)
    expect(role).toBeInstanceOf(Object)
    expect(role.id).toBe(result.id)
    expect(role.name).toBe(result.name)
  })
})
