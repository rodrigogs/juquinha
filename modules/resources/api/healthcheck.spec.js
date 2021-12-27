import pkg from '../../../package.json'
import path from 'path'
import unzip from 'lib/helpers/unzip'
import * as env from 'config/env'

let handler = null

describe('Healthcheck', function () {
  beforeAll(async () => {
    const serverlessDir = path.resolve(__dirname, './.serverless')
    const zipFilePath = path.resolve(path.resolve(serverlessDir, `${env.APP_PREFIX}-resources-api.zip`))
    const outputDir = path.resolve(serverlessDir, `${env.APP_PREFIX}-resources-api`)
    await unzip(zipFilePath, outputDir)
    ; ({ handler } = await import(path.resolve(__dirname, `./.serverless/${env.APP_PREFIX}-resources-api/healthcheck.js`)))
  })

  it('should be defined', function () {
    expect(handler).toBeDefined()
  })

  it('should answer a get request at "/" with 200 status', async function () {
    const event = {
      httpMethod: 'GET',
      path: '/',
    }
    const response = await handler(event)
    expect(response.statusCode).toBe(200)
    expect(response.body).toBe(`{"message":"${pkg.name}: ${pkg.version}"}`)
  }, 10000)
})
