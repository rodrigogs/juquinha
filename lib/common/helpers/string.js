import plural from 'pluralize'

export const getNumbers = (string) => string.replace(/\D/g, '')

export const pluralize = (string) => {
  // @see https://github.com/plurals/pluralize/issues/145
  const probablyPluralized = plural.plural(string)
  if (probablyPluralized.endsWith('s')) return probablyPluralized
  return `${probablyPluralized}s`
}
