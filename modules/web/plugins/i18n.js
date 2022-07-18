import i18n from '@juquinha/lib/i18n/index.mjs'

const i18nResolver = (term, params, options) =>
  i18n(term, params, {
    ...options,
    language: navigator.language,
  })

export default (ctx, inject) => {
  inject('i18n', i18nResolver)
  ctx.i18n = i18nResolver
}
