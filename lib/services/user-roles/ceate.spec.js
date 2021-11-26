import 'config/env'
import createUserRole from './create'

describe('foo', () => {
  it('bar', async () => {
    try {
      const foo = await createUserRole('auth0%7C5f6b9dd44419aa00717fb0e9', 'Admin')
      console.log(foo)
    } catch (err) {
      console.error(err)
    }
  }, 120000)
})
