import AccessLogsService from '.'
import faker from 'faker'

describe('AccessLogsService', () => {
  it('#create', async () => {
    const method = faker.internet.httpMethod()
    const userId = faker.datatype.uuid()
    const payload = {
      requestHash: `${method}/users/${userId}`,
      occurredAt: '1642451243487',
      queryParams: '{}',
      path: `/users/${userId}`,
      statusCode: 200,
      pathParams: `{"id":"${userId}"}`,
      method,
      body: '{"name":"aut explicabo officia voluptatibus enim quasi saepe","email":"Ibrahim43@hotmail.com"}',
    }
    const accessLog = await AccessLogsService.create(payload)
    expect(accessLog).toBeDefined()
    expect(accessLog.requestHash).toBeDefined()
    expect(accessLog.occurredAt).toBeDefined()
    expect(accessLog.method).toBe(payload.method)
    expect(accessLog.path).toBe(payload.path)
    expect(accessLog.pathParams).toBe(payload.pathParams)
    expect(accessLog.queryParams).toBe(payload.queryParams)
    expect(accessLog.body).toBe(payload.body)
    expect(accessLog.statusCode).toBe(payload.statusCode)
    expect(accessLog.errorMessage).toBe(payload.errorMessage)
  })

  it('#list', async () => {
    const method = faker.internet.httpMethod()
    const userId = faker.datatype.uuid()
    const payload = {
      requestHash: `${method}/users/${userId}`,
      occurredAt: '1642451243487',
      queryParams: '{}',
      path: `/users/${userId}`,
      statusCode: 200,
      pathParams: `{"id":"${userId}"}`,
      method,
      body: '{"name":"aut explicabo officia voluptatibus enim quasi saepe","email":"asdfasd@asdasd.com"}',
    }
    await AccessLogsService.create(payload)
    const { data: accessLogs } = await AccessLogsService.list({ limit: 1 })
    expect(accessLogs).toBeDefined()
    expect(accessLogs.length).toBe(1)
    expect(accessLogs[0].requestHash).toBeDefined()
    expect(accessLogs[0].occurredAt).toBeDefined()
  })
})
