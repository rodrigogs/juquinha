import '@juquinha/config/env'
import getOneById from './get-one-by-id'
import RolesModel from '@juquinha/lib/models/roles'

describe('RolesService', () => {
  it('#getOneById', async () => {
    const [result] = await RolesModel.scan().limit(1).exec()
    const Role = await getOneById(result.id)
    expect(Role).toBeInstanceOf(Object)
    expect(Role.id).toBe(result.id)
  })
})
