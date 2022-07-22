import path from 'path'
import unzip from '@juquinha/lib/helpers/unzip.mjs'
import { APP_PREFIX, APP_NAME } from '@juquinha/config/env.mjs'
import __dirname from './dirname.cjs'

let handler = null

describe('Healthcheck', function () {
  beforeAll(async () => {
    const serverlessDir = path.resolve(__dirname, '.serverless')
    const zipFilePath = path.resolve(serverlessDir, `${APP_PREFIX}-resources-api.zip`)
    const outputDir = path.resolve(serverlessDir, `${APP_PREFIX}-resources-api`)
    await unzip(zipFilePath, outputDir)
    const healthcheckLambda = (await import(path.resolve(outputDir, 'healthcheck.js'))).default
    handler = healthcheckLambda.handler
  })

  it('should be defined', function () {
    expect(handler).toBeDefined()
  })

  it('should answer a get request at "/" with 200 status', async function () {
    const event = {
      httpMethod: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      path: '/',
    }
    const response = await handler(event)
    expect(response.statusCode).toBe(200)

    const body = JSON.parse(response.body)
    expect(body.message).toBe(APP_NAME)
  })
})
