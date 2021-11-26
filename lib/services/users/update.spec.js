import 'config/env'
import update from './update'

describe('foo', () => {
  it('bar', async () => {
    try {
      const result = await update('rol_E9ZCJ3We8i5tWuXo', {
        createdAt: '2020-11-20T19:12:34.263Z',
        description: 'teste teeeeta',
        id: 'rol_E9ZCJ3We8i5tWuXo',
        name: 'Teste',
        updatedAt: '2020-11-20T19:14:24.913Z',
      })
      console.log(result)
    } catch (err) {
      console.error(err)
    }
  }, 120000)
})
