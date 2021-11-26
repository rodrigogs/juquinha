import 'config/env'
import listRolesByUserId from './list-roles-by-user-id'

describe('foo', () => {
  it('bar', async () => {
    try {
      const r = await listRolesByUserId('auth0|5f6b9dd44419aa00717fb0e9', {
        populateRoles: true,
        populateUsers: true,
      })
      console.log(r)
    } catch (err) {
      console.error(err)
    }
  }, 120000)
})
