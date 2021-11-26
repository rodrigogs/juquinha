import Mustache from 'mustache'
import * as langs from './langs'
import { DEFAULT_LANGUAGE } from 'config/env'

export default (term, params, { language } = {}) => {
  const lang = (language || DEFAULT_LANGUAGE || '').replace('-', '')
  let dictionary = langs[lang]
  if (!dictionary) {
    dictionary = langs[DEFAULT_LANGUAGE]
  }
  const dictionaryTerm = dictionary && dictionary[term]
  return Mustache.render(dictionaryTerm || term, params)
}
