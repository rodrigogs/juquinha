import 'config/env'
import faker from 'faker'
import UsersService from 'lib/services/users'
import RolesService from 'lib/services/roles'
import UserRolesService from 'lib/services/user-roles'
import { handler } from './get'

describe('API: Users(GET)', () => {
  it('list', async () => {
    const event = {
      resource: '/users',
      path: '/users',
      httpMethod: 'GET',
      headers: {
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
      },
      multiValueHeaders: {
        Accept: [
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        ],
        'Accept-Encoding': [
          'gzip, deflate, br',
        ],
        'Accept-Language': [
          'en-US,en;q=0.9',
        ],
      },
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      pathParameters: null,
      stageVariables: null,
      requestContext: {
        resourcePath: '/users',
        httpMethod: 'GET',
        requestTime: '08/Nov/2021:17:14:25 +0000',
        path: '/dev/users',
        accountId: '201373306222',
        protocol: 'HTTP/1.1',
        stage: 'dev',
        identity: {
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
        },
      },
      body: null,
      isBase64Encoded: false,
    }

    const context = {}

    const response = await handler(event, context)
    expect(response.statusCode).toBe(200)
  })

  it('getOneById', async () => {
    const user = (await UsersService.list({ limit: 1 })).data[0]
    const event = {
      resource: '/users/id/:id',
      path: `/users/id/${user.id}`,
      httpMethod: 'GET',
      headers: {
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
      },
      multiValueHeaders: {
        Accept: [
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        ],
        'Accept-Encoding': [
          'gzip, deflate, br',
        ],
        'Accept-Language': [
          'en-US,en;q=0.9',
        ],
      },
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      pathParameters: { id: user.id },
      stageVariables: null,
      requestContext: {
        resourcePath: `/users/id/${user.id}`,
        httpMethod: 'GET',
        requestTime: '08/Nov/2021:17:14:25 +0000',
        path: `/users/id/${user.id}`,
        // eslint-disable-next-line no-process-env
        stage: process.env.STAGE || 'dev',
        identity: {
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
        },
      },
      body: null,
      isBase64Encoded: false,
    }

    const context = {}

    const response = await handler(event, context)
    expect(response.statusCode).toBe(200)
  })

  it('getRolesByUserId', async () => {
    const roleName = faker.lorem.words(3 + Math.floor(Math.random() * 8))
    const roleDescription = faker.name.lastName()
    const user = (await UsersService.list({ limit: 1 })).data[0]
    const role = await RolesService.create({ name: roleName, description: roleDescription })
    await UserRolesService.create({ roleId: role.id, userId: user.id })

    const event = {
      resource: '/users/:id/roles',
      path: `/users/${user.id}/roles`,
      httpMethod: 'GET',
      headers: {
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
      },
      multiValueHeaders: {
        Accept: [
          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        ],
        'Accept-Encoding': [
          'gzip, deflate, br',
        ],
        'Accept-Language': [
          'en-US,en;q=0.9',
        ],
      },
      queryStringParameters: null,
      multiValueQueryStringParameters: null,
      pathParameters: { id: user.id },
      stageVariables: null,
      requestContext: {
        resourcePath: `/users/${user.id}/roles`,
        httpMethod: 'GET',
        requestTime: '08/Nov/2021:17:14:25 +0000',
        path: `/users/${user.id}/roles`,
        stage: 'dev',
        identity: {
          userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
        },
      },
      body: null,
      isBase64Encoded: false,
    }

    const context = {}

    const response = await handler(event, context)
    expect(response.statusCode).toBe(200)
    const body = JSON.parse(response.body)
    expect(body.data.length).toBeGreaterThan(0)
  })
})
