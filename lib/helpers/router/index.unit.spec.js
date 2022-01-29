import { default as Router, responseBuilder } from './index'

const request = {
  event: {
    resource: '/',
    path: '/',
    httpMethod: 'GET',
    headers: {
      Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-US,en;q=0.9',
      'cache-control': 'max-age=0',
      'CloudFront-Forwarded-Proto': 'https',
      'CloudFront-Is-Desktop-Viewer': 'true',
      'CloudFront-Is-Mobile-Viewer': 'false',
      'CloudFront-Is-SmartTV-Viewer': 'false',
      'CloudFront-Is-Tablet-Viewer': 'false',
      'CloudFront-Viewer-Country': 'BR',
      Host: 'utwopfk6kl.execute-api.us-east-2.amazonaws.com',
      'sec-fetch-dest': 'document',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'none',
      'sec-fetch-user': '?1',
      'sec-gpc': '1',
      'upgrade-insecure-requests': '1',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
      Via: '2.0 c93d4ed7938cd391613a13e7dd8ed2ec.cloudfront.net (CloudFront)',
      'X-Amz-Cf-Id': 'CD-KO1MEcUVVHgMjldlziMWkwYW0NQG-oOLKfTBf-NTEB-SKmfiISQ==',
      'X-Amzn-Trace-Id': 'Root=1-61895af1-4b725620595bd1461212af8b',
      'X-Forwarded-For': '177.16.109.99, 52.46.43.165',
      'X-Forwarded-Port': '443',
      'X-Forwarded-Proto': 'https',
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
      'cache-control': [
        'max-age=0',
      ],
      'CloudFront-Forwarded-Proto': [
        'https',
      ],
      'CloudFront-Is-Desktop-Viewer': [
        'true',
      ],
      'CloudFront-Is-Mobile-Viewer': [
        'false',
      ],
      'CloudFront-Is-SmartTV-Viewer': [
        'false',
      ],
      'CloudFront-Is-Tablet-Viewer': [
        'false',
      ],
      'CloudFront-Viewer-Country': [
        'BR',
      ],
      Host: [
        'utwopfk6kl.execute-api.us-east-2.amazonaws.com',
      ],
      'sec-fetch-dest': [
        'document',
      ],
      'sec-fetch-mode': [
        'navigate',
      ],
      'sec-fetch-site': [
        'none',
      ],
      'sec-fetch-user': [
        '?1',
      ],
      'sec-gpc': [
        '1',
      ],
      'upgrade-insecure-requests': [
        '1',
      ],
      'User-Agent': [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
      ],
      Via: [
        '2.0 c93d4ed7938cd391613a13e7dd8ed2ec.cloudfront.net (CloudFront)',
      ],
      'X-Amz-Cf-Id': [
        'CD-KO1MEcUVVHgMjldlziMWkwYW0NQG-oOLKfTBf-NTEB-SKmfiISQ==',
      ],
      'X-Amzn-Trace-Id': [
        'Root=1-61895af1-4b725620595bd1461212af8b',
      ],
      'X-Forwarded-For': [
        '177.16.109.99, 52.46.43.165',
      ],
      'X-Forwarded-Port': [
        '443',
      ],
      'X-Forwarded-Proto': [
        'https',
      ],
    },
    queryStringParameters: null,
    multiValueQueryStringParameters: null,
    pathParameters: null,
    stageVariables: null,
    requestContext: {
      resourceId: 'thsgnzo3p2',
      resourcePath: '/',
      httpMethod: 'GET',
      extendedRequestId: 'IfsluEwYiYcFahA=',
      requestTime: '08/Nov/2021:17:14:25 +0000',
      path: '/dev/',
      accountId: '201373306222',
      protocol: 'HTTP/1.1',
      stage: 'dev',
      domainPrefix: 'utwopfk6kl',
      requestTimeEpoch: 1636391665264,
      requestId: '33b50aba-fc5b-4304-9caf-f8de5b2696bd',
      identity: {
        cognitoIdentityPoolId: null,
        accountId: null,
        cognitoIdentityId: null,
        caller: null,
        sourceIp: '177.16.109.99',
        principalOrgId: null,
        accessKey: null,
        cognitoAuthenticationType: null,
        cognitoAuthenticationProvider: null,
        userArn: null,
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
        user: null,
      },
      domainName: 'utwopfk6kl.execute-api.us-east-2.amazonaws.com',
      apiId: 'utwopfk6kl',
    },
    body: null,
    isBase64Encoded: false,
  },
  context: {
    callbackWaitsForEmptyEventLoop: true,
    functionVersion: '$LATEST',
    functionName: 'mmw-resources-api-dev-healthcheck',
    memoryLimitInMB: '128',
    logGroupName: '/aws/lambda/mmw-resources-api-dev-healthcheck',
    logStreamName: '2021/11/08/[$LATEST]ddd55f3513ac4c7ea8a0a2e9338e7593',
    invokedFunctionArn: 'arn:aws:lambda:us-east-2:201373306222:function:mmw-resources-api-dev-healthcheck',
    awsRequestId: 'bbe41696-5d55-49bc-ab36-f4cc5729702e',
  },
}

describe('Router', () => {
  it('#get should be a function', () => {
    const router = new Router(request.event, request.context)
    expect(router.get).toBeDefined()
  })

  it('#http.get should be a function', async () => {
    const router = new Router(request.event, request.context)
    const response = await router
      .get('/', () => responseBuilder.success.ok({ body: 'Hello World' }))
      .dispatch()
    expect(response.statusCode).toBe(200)
    expect(response.body).toBe('Hello World')
  })
})
