import i18n from './'
import * as langs from './langs'

describe('i18n', () => {
  it('should return a function', () => {
    expect(typeof i18n).toBe('function')
  })

  it('should resolve the term', () => {
    const term = 'crud.create.success'
    const params = {
      entityName: 'User',
    }
    const result = i18n(term, params)
    expect(result).toBe('User successfully created')
  })

  it('lang files should have the same keys', () => {
    let results = ''
    const langKeys = Object.keys(langs)
    for (const lang of langKeys) {
      for (const comparingLang of langKeys.filter(l => l !== lang)) {
        const langKeys1 = Object.keys(langs[lang])
        const langKeys2 = Object.keys(langs[comparingLang])
        for (const key of langKeys1) {
          if (!langKeys2.includes(key)) {
            results += `${comparingLang} does not have "${key}" key as in ${lang}\n`
          }
        }
      }
    }
    expect(results).toBe('')
  })
})
