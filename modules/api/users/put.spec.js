import * as put from './put'

describe('foo', () => {
  it('bar', async () => {
    const event = {
      httpMethod: 'PUT',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
        Authorization: 'Bearer MSycDCYU5-Bhz87EVHND8mCXDAz7T4gF',
        'CloudFront-Forwarded-Proto': 'https',
        'CloudFront-Is-Desktop-Viewer': 'true',
        'CloudFront-Is-Mobile-Viewer': 'false',
        'CloudFront-Is-SmartTV-Viewer': 'false',
        'CloudFront-Is-Tablet-Viewer': 'false',
        'CloudFront-Viewer-Country': 'BR',
        'content-type': 'application/json;charset=UTF-8',
        Host: 'api.primemedicina.com',
        origin: 'https://dev.sulp.com.br',
        Referer: 'https://dev.sulp.com.br/',
        'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
        'sec-ch-ua-mobile': '?0',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
        Via: '2.0 31154529f9ff5fc95f3438c30cfb64f0.cloudfront.net (CloudFront)',
        'X-Amz-Cf-Id': 'PxPawXNU78f5F54K4C77LktIIh6ijomdUsjJd9i5_iW8TXliBzlEmA==',
        'X-Amzn-Trace-Id': 'Root=1-6108324a-7b5703f23fcfe56a310e7718',
        'X-Forwarded-For': '170.231.46.67, 130.176.40.164',
        'X-Forwarded-Port': '443',
        'X-Forwarded-Proto': 'https',
      },
      multiValueHeaders: {
        Accept: ['application/json, text/plain, */*'],
        'Accept-Encoding': ['gzip, deflate, br'],
        'Accept-Language': ['pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7'],
        Authorization: ['Bearer MSycDCYU5-Bhz87EVHND8mCXDAz7T4gF'],
        'CloudFront-Forwarded-Proto': ['https'],
        'CloudFront-Is-Desktop-Viewer': ['true'],
        'CloudFront-Is-Mobile-Viewer': ['false'],
        'CloudFront-Is-SmartTV-Viewer': ['false'],
        'CloudFront-Is-Tablet-Viewer': ['false'],
        'CloudFront-Viewer-Country': ['BR'],
        'content-type': ['application/json;charset=UTF-8'],
        Host: ['api.primemedicina.com'],
        origin: ['https://dev.sulp.com.br'],
        Referer: ['https://dev.sulp.com.br/'],
        'sec-ch-ua': ['"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"'],
        'sec-ch-ua-mobile': ['?0'],
        'sec-fetch-dest': ['empty'],
        'sec-fetch-mode': ['cors'],
        'sec-fetch-site': ['cross-site'],
        'User-Agent': [
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
        ],
        Via: ['2.0 31154529f9ff5fc95f3438c30cfb64f0.cloudfront.net (CloudFront)'],
        'X-Amz-Cf-Id': ['PxPawXNU78f5F54K4C77LktIIh6ijomdUsjJd9i5_iW8TXliBzlEmA=='],
        'X-Amzn-Trace-Id': ['Root=1-6108324a-7b5703f23fcfe56a310e7718'],
        'X-Forwarded-For': ['170.231.46.67, 130.176.40.164'],
        'X-Forwarded-Port': ['443'],
        'X-Forwarded-Proto': ['https'],
      },
      queryStringParameters: {},
      multiValueQueryStringParameters: {},
      pathParameters: {
        id: 'auth0|60e0daf0a78b7a00706bf897',
      },
      body: {
        master: false,
        __filterKey:
          'pedropiccaro§pedro piccaro§pedropiccaro@primemedicina.com§https://s.gravatar.com/avatar/9e8b34285da2e6ed29178f43fe1ad740?s=480&r=pg&d=https%3a%2f%2fcdn.auth0.com%2favatars%2fpp.png§03/07/2021§01/08/2021pedropiccaro§pedro piccaro§pedropiccaro@primemedicina.com§https://s.gravatar.com/avatar/9e8b34285da2e6ed29178f43fe1ad740?s=480&r=pg&d=https%3a%2f%2fcdn.auth0.com%2favatars%2fpp.png§03/07/2021§01/08/2021',
        username: 'pedropiccaro',
        email: 'pedropiccaro@primemedicina.com',
        picture:
          'https://s.gravatar.com/avatar/9e8b34285da2e6ed29178f43fe1ad740?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fpp.png',
        name: 'Pedro Piccaro',
        idMetacem: 80586,
      },
      session: {
        user: {
          master: false,
          __filterKey:
            'pedropiccaro§pedro piccaro§pedropiccaro@primemedicina.com§https://s.gravatar.com/avatar/9e8b34285da2e6ed29178f43fe1ad740?s=480&r=pg&d=https%3a%2f%2fcdn.auth0.com%2favatars%2fpp.png§03/07/2021§01/08/2021pedropiccaro§pedro piccaro§pedropiccaro@primemedicina.com§https://s.gravatar.com/avatar/9e8b34285da2e6ed29178f43fe1ad740?s=480&r=pg&d=https%3a%2f%2fcdn.auth0.com%2favatars%2fpp.png§03/07/2021§01/08/2021',
          updatedAt: '2021-08-02T03:12:12.136Z',
          createdAt: '2021-07-03T21:47:28.568Z',
          username: 'pedropiccaro',
          id: 'auth0|60e0daf0a78b7a00706bf897',
          email: 'pedropiccaro@primemedicina.com',
          picture:
            'https://s.gravatar.com/avatar/9e8b34285da2e6ed29178f43fe1ad740?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fpp.png',
          name: 'Pedro Piccaro',
        },
        roles: [
          {
            __filterKey: 'master§24/01/2021§01/08/2021master§24/01/2021§01/08/2021',
            updatedAt: '2021-08-02T03:12:13.022Z',
            createdAt: '2021-01-24T23:14:06.149Z',
            id: 'rol_M4G0mAUBi6C6Zmds',
            name: 'Master',
          },
        ],
        permissions: [
          {
            __filterKey:
              'controle total§allow§all§^§24/01/2021§01/08/2021controle total§allow§all§^§24/01/2021§01/08/2021',
            path: '^',
            updatedAt: '2021-08-02T03:12:50.126Z',
            createdAt: '2021-01-24T23:11:30.205Z',
            id: '803b71cd-b5b8-48fc-bf2d-9404cbc00532',
            name: 'Controle Total',
            method: 'ALL',
            type: 'ALLOW',
          },
        ],
        when: 1627926870395,
      },
      path: '/users/auth0%7C60e0daf0a78b7a00706bf897',
      resource: '/users/{id}',
    }
    try {
      await put.handler(event)
    } catch (err) {
      console.error(err)
    }
  })
})
