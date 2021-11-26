import * as get from './get'

describe('', () => {
  it('', async () => {
    const event = {
      httpMethod: 'GET',
      headers: {
        Accept: 'application/json, text/plain, */*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7',
        Authorization: 'Bearer BE9S3BhzahVW2MJvfKSV7-uaHcl1OWdv',
        'CloudFront-Forwarded-Proto': 'https',
        'CloudFront-Is-Desktop-Viewer': 'true',
        'CloudFront-Is-Mobile-Viewer': 'false',
        'CloudFront-Is-SmartTV-Viewer': 'false',
        'CloudFront-Is-Tablet-Viewer': 'false',
        'CloudFront-Viewer-Country': 'BR',
        Host: 'api.primemedicina.com',
        origin: 'https://web.sulp.com.br',
        Referer: 'https://web.sulp.com.br/',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site',
        'sec-gpc': '1',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
        Via: '2.0 1b62b34fbd0a31a77a5f74a5d243e41f.cloudfront.net (CloudFront)',
        'X-Amz-Cf-Id': 'iput-TxgHmsU_lPGpqBFV1QibVvvGj3B-wCogSsCgiqJfNeN1lgweQ==',
        'X-Amzn-Trace-Id': 'Root=1-60b69bdb-4d26151410379d915553087a',
        'X-Forwarded-For': '189.114.201.17, 130.176.160.172',
        'X-Forwarded-Port': '443',
        'X-Forwarded-Proto': 'https',
      },
      multiValueHeaders: {
        Accept: ['application/json, text/plain, */*'],
        'Accept-Encoding': ['gzip, deflate, br'],
        'Accept-Language': ['en-US,en;q=0.9,pt-BR;q=0.8,pt;q=0.7'],
        Authorization: ['Bearer BE9S3BhzahVW2MJvfKSV7-uaHcl1OWdv'],
        'CloudFront-Forwarded-Proto': ['https'],
        'CloudFront-Is-Desktop-Viewer': ['true'],
        'CloudFront-Is-Mobile-Viewer': ['false'],
        'CloudFront-Is-SmartTV-Viewer': ['false'],
        'CloudFront-Is-Tablet-Viewer': ['false'],
        'CloudFront-Viewer-Country': ['BR'],
        Host: ['api.primemedicina.com'],
        origin: ['https://web.sulp.com.br'],
        Referer: ['https://web.sulp.com.br/'],
        'sec-fetch-dest': ['empty'],
        'sec-fetch-mode': ['cors'],
        'sec-fetch-site': ['cross-site'],
        'sec-gpc': ['1'],
        'User-Agent': [
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Safari/537.36',
        ],
        Via: ['2.0 1b62b34fbd0a31a77a5f74a5d243e41f.cloudfront.net (CloudFront)'],
        'X-Amz-Cf-Id': ['iput-TxgHmsU_lPGpqBFV1QibVvvGj3B-wCogSsCgiqJfNeN1lgweQ=='],
        'X-Amzn-Trace-Id': ['Root=1-60b69bdb-4d26151410379d915553087a'],
        'X-Forwarded-For': ['189.114.201.17, 130.176.160.172'],
        'X-Forwarded-Port': ['443'],
        'X-Forwarded-Proto': ['https'],
      },
      queryStringParameters: {},
      multiValueQueryStringParameters: {},
      pathParameters: {
        uf: 'RS',
        crm: '033977',
      },
      session: {
        user: {
          master: true,
          idMetacem: '80589',
          __filterKey:
            'pedropiccaro§pedro piccaro§pedropiccaro@primemedicina.com§https://s.gravatar.com/avatar/9e8b34285da2e6ed29178f43fe1ad740?s=480&r=pg&d=https%3a%2f%2fcdn.auth0.com%2favatars%2fpp.png§01/06/2021§01/06/2021pedropiccaro§pedro piccaro§pedropiccaro@primemedicina.com§https://s.gravatar.com/avatar/9e8b34285da2e6ed29178f43fe1ad740?s=480&r=pg&d=https%3a%2f%2fcdn.auth0.com%2favatars%2fpp.png§01/06/2021§01/06/2021',
          updatedAt: '2021-06-01T19:12:25.263Z',
          createdAt: '2021-06-01T01:33:11.474Z',
          username: 'pedropiccaro',
          id: 'auth0|60b58e57e200cb007097e2d9',
          email: 'pedropiccaro@primemedicina.com',
          picture:
            'https://s.gravatar.com/avatar/9e8b34285da2e6ed29178f43fe1ad740?s=480&r=pg&d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fpp.png',
          name: 'Pedro Piccaro',
        },
        roles: [
          {
            __filterKey: 'master§25/01/2021§25/01/2021master§25/01/2021§25/01/2021',
            updatedAt: '2021-06-01T04:05:05.949Z',
            createdAt: '2021-01-25T04:06:52.534Z',
            id: 'rol_aV1zlf4bWOv5cr2f',
            name: 'Master',
          },
        ],
        permissions: [
          {
            __filterKey:
              'controle total§allow§all§^§25/01/2021§25/01/2021controle total§allow§all§^§25/01/2021§25/01/2021',
            path: '^',
            updatedAt: '2021-06-01T04:05:30.543Z',
            createdAt: '2021-01-25T04:10:50.314Z',
            id: 'b7c8ad53-7171-4609-a668-cba6ba057216',
            name: 'Controle Total',
            method: 'ALL',
            type: 'ALLOW',
          },
        ],
        when: 1622579938303,
      },
      path: '/users/metacem/033977/RS',
      resource: '/users/metacem/{crm}/{uf}',
    }
    try {
      const response = await get.handler(event, {})
      console.log(response)
    } catch (err) {
      console.error(err)
    }
  })
})
