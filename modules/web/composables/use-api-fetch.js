const removeUndefined = (object) => {
  if (!object) return object
  const result = {}
  for (const key of Object.keys(object)) {
    if (object[key] !== undefined) {
      result[key] = object[key]
    }
  }
  return result
}

export default (fetchComposable) => (path, options) => {
  const config = useRuntimeConfig()
  const apiUrl = config.public.API_URL
  const normalizedApUrl = apiUrl.replace(/\/$/, '')
  const key = JSON.stringify({ path, options })
  const url = `${normalizedApUrl}/${path}`
  const normalizedOptions = { ...options, params: removeUndefined(options.params) }
  return fetchComposable(url, { key, ...normalizedOptions })
}
