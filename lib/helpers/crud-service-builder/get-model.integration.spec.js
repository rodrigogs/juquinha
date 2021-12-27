import 'config/env'
import getModel from './get-model'

const MODELS = [
  'users',
  'roles',
  'permissions',
  'user-roles',
  'role-permissions',
  'access-logs',
]

describe('CrudServiceBuilder', () => {
  it('_getModel', async () => {
    try {
      for (const model of MODELS) {
        const result = await getModel(model)
        expect(result).toBeDefined()
      }
    } catch (debugMe) {
      console.log(debugMe)
      throw debugMe
    }
  })
})
