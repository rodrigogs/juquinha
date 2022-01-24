import 'config/env'
import getOneByName from './get-one-by-name'
import RolesModel from 'lib/models/roles'

describe('RolesService', () => {
  it('#getOneByName', async () => {
    const [result] = await RolesModel.scan().limit(1).exec()
    const role = await getOneByName(result.name)
    expect(role).toBeInstanceOf(Object)
    expect(role.id).toBe(result.id)
    expect(role.name).toBe(result.name)
  })
})
