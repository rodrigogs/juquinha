import 'config/env'
import getOneById from './get-one-by-id'
import UsersModel from '../../models/users'

describe('foo', () => {
  it('bar', async () => {
    try {
      await UsersModel.scan().limit(1).exec()
      const foo = await getOneById('google-oauth2|112492900510306709054')
      console.log(foo)
    } catch (err) {
      console.error(err)
    }
  })
})
