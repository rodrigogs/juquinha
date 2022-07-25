import i18n from '@juquinha/lib/i18n/index.mjs'

export default defineNuxtPlugin(() => {
  return {
    provide: {
      i18n,
    }
  }
})
