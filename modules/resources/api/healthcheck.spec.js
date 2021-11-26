import pkg from '../../../package.json'
import { handler } from './.serverless/mmw-resources-api/healthcheck'

describe('Healthcheck', function () {
  it('should be defined', function () {
    expect(handler).toBeDefined()
  })

  it('should answer a get request at "/" with 200 status', async function () {
    const event = {
      httpMethod: 'GET',
      path: '/',
    }
    try {
      const response = await handler(event)
      expect(response.statusCode).toBe(200)
      expect(response.body).toBe(`{"message":"${pkg.name}: ${pkg.version}"}`)
    } catch (error) {
      console.error(error)
    }
  })
})
