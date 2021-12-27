import 'config/env'
import list from './list'

describe('CrudServiceBuilder', () => {
  it('#list', async () => {
    try {
      const limit = 2
      const page = await list('permissions')({ limit })
      expect(page).toBeDefined()
      expect(page.data).toBeDefined()
      expect(page.data.length).toBe(limit)
      expect(page.lastKey).toBeDefined()
      const page2 = await list('permissions')({ limit, lastKey: page.lastKey })
      expect(page2).toBeDefined()
      expect(page2.data).toBeDefined()
      expect(page2.data.length).toBe(limit)
      expect(page2.lastKey).toBeDefined()
    } catch (debugMe) {
      console.log(debugMe)
      throw debugMe
    }
  })
})
