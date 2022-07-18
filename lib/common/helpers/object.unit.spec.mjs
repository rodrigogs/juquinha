import * as objectHelper from './object.mjs'

describe('ObjectHelper', () => {
  it('#deepAssign', async () => {
    const original = { a: 'a', nested: { a: 'a' } }
    const updatingInfo = { a: 'a2', b: 'b', nested: { a: 'a2', b: 'b' }, new: { c: 'c' } }
    const result = objectHelper.deepAssign(original, updatingInfo)
    expect(result).toEqual({
      a: 'a2',
      nested: {
        a: 'a2',
        b: 'b',
      },
      b: 'b',
      new: {
        c: 'c',
      },
    })
  })

  it('#deepAssign abnormality', async () => {
    const currentDoc = {
      __filterKey:
        'auth0|60c0e4248bc73d007004ac14§bbq486§uashduashduaasdasdasd',
      cns: '000000000000000',
      status: 'scheduled',
      healthInsurance: 'SUS',
      name: 'uashduashduasdua',
    }
    const updatingInfo = {
      __filterKey:
        'autasdfasfasfasfasfasf',
      birthDate: '25/03/1991',
      cns: '000000000000000',
      status: 'ongoing',
      createdAt: '2021-06-13T16:38:42.722Z',
      date: '1623576600000',
      active: true,
      pin: 'BBQ486',
      updatedAt: '2021-06-13T16:39:17.464Z',
    }
    const result = objectHelper.deepAssign(currentDoc, updatingInfo)
    expect(result.status).toEqual(updatingInfo.status)
  })
})
