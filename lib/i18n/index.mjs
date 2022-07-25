/* eslint-disable import/namespace */
import Mustache from 'mustache'
import * as langs from './langs/index.mjs'

const DEFAULT_LANGUAGE = 'en'

export default (term, params, { language } = {}) => {
  const lang = (language || DEFAULT_LANGUAGE || '').replace('-', '')
  let dictionary = langs[lang]
  if (!dictionary) {
    dictionary = langs[DEFAULT_LANGUAGE]
  }
  const dictionaryTerm = dictionary && dictionary[term]
  return Mustache.render(dictionaryTerm || term, params)
}
