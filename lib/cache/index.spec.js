import mockFs from 'mock-fs'
import * as cache from '.'
import { wait } from '../common/helpers/promise'

beforeEach(() =>
  mockFs({
    '/mnt/shared': {},
  }),
)

afterEach(() => mockFs.restore())

describe('foo', () => {
  it('bar', async () => {
    try {
      console.log('Input values are', ['foo', 'bar', 'baz'])
      await cache.set('foo', 'bar', 'baz')
      console.log('Waiting 5 minutes')
      await wait(1 * 60 * 1000)
      const c = await cache.get('foo', 'bar')
      console.log('Received', c)
    } catch (err) {
      console.error(err)
    }
  }, 6000000)
})
