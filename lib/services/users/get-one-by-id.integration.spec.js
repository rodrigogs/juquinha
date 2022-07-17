import '@juquinha/config/env'
import getOneById from './get-one-by-id'
import UsersModel from '@juquinha/lib/models/users'

describe('UsersService', () => {
  it('#getOneById', async () => {
    const [result] = await UsersModel.scan().limit(1).exec()
    const user = await getOneById(result.id)
    expect(user).toBeInstanceOf(Object)
    expect(user.id).toBe(result.id)
  })
})
