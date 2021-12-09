import plural from 'pluralize'

export const getNumbers = (string) => string.replace(/\D/g, '')

export const pluralize = (string) => {
  // @see https://github.com/plurals/pluralize/issues/145
  const probablyPluralized = plural.plural(string)
  if (probablyPluralized.endsWith('s')) return probablyPluralized
  return `${probablyPluralized}s`
}

export const camelToKebab = str => {
  return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
}

export const kebabToCamel = str => {
  return str.replace(/-([a-z])/g, (g) => {
    return g[1].toUpperCase()
  })
}
