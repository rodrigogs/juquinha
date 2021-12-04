import path from 'path'
import runScript from 'lib/helpers/run-npm-script'

describe('Juquinha', function() {

  it('should init the application', async () => {
    await runScript('bootstrap')
    await import(path.resolve(__dirname, '../../scripts/init.js'))
  }, 10000000)

  it('should clean all dependencies and leftovers', async () => {
    await runScript('clean')
  }, 10000000)

})
