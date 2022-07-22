import '@juquinha/config/env.mjs'
import getOneByUsername from './get-one-by-username.mjs'
import UsersModel from '@juquinha/lib/models/users.mjs'

describe('UsersService', () => {
  it('#getOneByUsername', async () => {
    const [result] = await UsersModel.scan().limit(1).exec()
    const user = await getOneByUsername(result.username)
    expect(user).toBeInstanceOf(Object)
    expect(user.id).toBe(result.id)
    expect(user.username).toBe(result.username)
  })
})
