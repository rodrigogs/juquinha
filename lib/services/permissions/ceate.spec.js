import 'config/env'
import createRole from './create'

describe('foo', () => {
  it('bar', async () => {
    try {
      const foo = await createRole({ name: 'Teste CRUD', description: 'Test d' })
      console.log(foo)
    } catch (err) {
      console.error(err)
    }
  })
})
