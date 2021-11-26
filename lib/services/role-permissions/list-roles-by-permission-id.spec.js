import 'config/env'
import listRolesByPermissionId from './list-roles-by-permission-id'

describe('foo', () => {
  it('bar', async () => {
    try {
      const foo = await listRolesByPermissionId('4f2e1216-ce91-4c48-9dbf-8746bf2ef53b', {
        populateAgendas: true,
        populateStations: true,
      })
      console.log(foo)
    } catch (err) {
      console.error(err)
    }
  })
})
