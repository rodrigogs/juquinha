import * as objectHelper from './object'

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
        'auth0|60c0e4248bc73d007004ac14§bbq486§uashduashduasdua§hasudhasudhauhd§1623576600000§022.732.240-10§25/03/1991§sus§basic§000000000000000§(51) 981554438§scheduled§13/06/2021§13/06/2021auth0|60c0e4248bc73d007004ac14§bbq486§uashduashduasdua§hasudhasudhauhd§1623576600000§022.732.240-10§25/03/1991§sus§basic§000000000000000§(51) 981554438§scheduled§13/06/2021§13/06/2021',
      birthDate: '25/03/1991',
      cns: '000000000000000',
      status: 'scheduled',
      firstPhone: '(51) 981554438',
      createdAt: '2021-06-13T16:38:42.722Z',
      user: 'auth0|60c0e4248bc73d007004ac14',
      agenda: '56788321-ea74-4e72-9060-e92f254fcd6d',
      healthInsurance: 'SUS',
      name: 'uashduashduasdua',
      date: '1623576600000',
      active: true,
      pin: 'BBQ486',
      updatedAt: '2021-06-13T16:39:17.464Z',
      cpf: '022.732.240-10',
      insurancePlan: 'Basic',
      description: 'hasudhasudhauhd',
      id: 'd2b72d74-e03e-4c91-bee0-43fbbbf1e2ce',
    }
    const updatingInfo = {
      __filterKey:
        'auth0|60c0e4248bc73d007004ac14§bbq486§uashduashduasdua§hasudhasudhauhd§1623576600000§022.732.240-10§25/03/1991§sus§basic§000000000000000§(51) 981554438§scheduled§13/06/2021§13/06/2021auth0|60c0e4248bc73d007004ac14§bbq486§uashduashduasdua§hasudhasudhauhd§1623576600000§022.732.240-10§25/03/1991§sus§basic§000000000000000§(51) 981554438§scheduled§13/06/2021§13/06/2021',
      birthDate: '25/03/1991',
      cns: '000000000000000',
      status: 'ongoing',
      firstPhone: '(51) 981554438',
      createdAt: '2021-06-13T16:38:42.722Z',
      user: 'auth0|60c0e4248bc73d007004ac14',
      agenda: '56788321-ea74-4e72-9060-e92f254fcd6d',
      healthInsurance: 'SUS',
      name: 'uashduashduasdua',
      date: '1623576600000',
      active: true,
      pin: 'BBQ486',
      updatedAt: '2021-06-13T16:39:17.464Z',
      cpf: '022.732.240-10',
      insurancePlan: 'Basic',
      description: 'hasudhasudhauhd',
      id: 'd2b72d74-e03e-4c91-bee0-43fbbbf1e2ce',
      idMetacem: 2551179,
      urlMetacem: 'http://dev.metacem.com/profissional/atendimento/2855189',
    }
    const result = objectHelper.deepAssign(currentDoc, updatingInfo)
    expect(result.urlMetacem).toEqual(updatingInfo.urlMetacem)
  })
})
