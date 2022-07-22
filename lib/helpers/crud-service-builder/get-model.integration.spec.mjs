import '@juquinha/config/env.mjs'
import getModel from './get-model.mjs'

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
    for (const model of MODELS) {
      const result = await getModel(model)
      expect(result).toBeDefined()
    }
  })
})
