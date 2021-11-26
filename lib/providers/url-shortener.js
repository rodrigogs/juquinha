import TinyURL from 'tinyurl'

export const shorten = async (url, alias) => {
  try {
    if (alias) return await TinyURL.shortenWithAlias({ url, alias })
    return await TinyURL.shorten(url)
  } catch (err) {
    console.error(
      `An error occurred trying to shorten url "${url}". The original url will be returned instead of the shortened one.`,
      err,
    )
    return url
  }
}

export const resolve = async (url) => TinyURL.resolve(url)
