import 'config/env'
import faker from 'faker'
import PermissionsService from 'lib/services/permissions'
import RolesService from 'lib/services/roles'
import RolePermissionsService from 'lib/services/role-permissions'
import { handler } from './get'

describe('API: Permissions(GET)', () => {
  it('list', async () => {
    try {
      const event = {
        resource: '/permissions',
        path: '/permissions',
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
          resourcePath: '/permissions',
          httpMethod: 'GET',
          requestTime: '08/Nov/2021:17:14:25 +0000',
          path: '/dev/permissions',
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
    } catch (debugMe) {
      console.log(debugMe)
      throw debugMe
    }
  })

  it('getOneById', async () => {
    try {
      const permission = await PermissionsService.create({
        name: global.createRandomName(),
        description: faker.lorem.words(3 + Math.floor(Math.random() * 8)),
        type: global.PERMISSION_TYPES[Math.floor(Math.random() * global.PERMISSION_TYPES.length)],
        method: global.PERMISSION_METHODS[Math.floor(Math.random() * global.PERMISSION_METHODS.length)],
        path: faker.internet.url(),
      })
      const event = {
        resource: '/permissions/:id',
        path: `/permissions/${permission.id}`,
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
        pathParameters: { id: permission.id },
        stageVariables: null,
        requestContext: {
          resourcePath: `/permissions/${permission.id}`,
          httpMethod: 'GET',
          requestTime: '08/Nov/2021:17:14:25 +0000',
          path: `/permissions/${permission.id}`,
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
    } catch (debugMe) {
      console.log(debugMe)
      throw debugMe
    }
  })

  it('permissions getRolesByPermissionId', async () => {
    try {
      const roleName = global.createRandomName()
      const roleDescription = faker.name.lastName()
      const permission = await PermissionsService.create({
        name: global.createRandomName(),
        description: faker.lorem.words(3 + Math.floor(Math.random() * 8)),
        type: global.PERMISSION_TYPES[Math.floor(Math.random() * global.PERMISSION_TYPES.length)],
        method: global.PERMISSION_METHODS[Math.floor(Math.random() * global.PERMISSION_METHODS.length)],
        path: faker.internet.url(),
      })
      const role = await RolesService.create({ name: roleName, description: roleDescription })
      await RolePermissionsService.create({ roleId: role.id, permissionId: permission.id })

      const event = {
        resource: '/permissions/:id/roles',
        path: `/permissions/${permission.id}/roles`,
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
        pathParameters: { id: permission.id },
        stageVariables: null,
        requestContext: {
          resourcePath: `/permissions/${permission.id}/roles`,
          httpMethod: 'GET',
          requestTime: '08/Nov/2021:17:14:25 +0000',
          path: `/permissions/${permission.id}/roles`,
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
    } catch (debugMe) {
      console.log(debugMe)
      throw debugMe
    }
  })
})
