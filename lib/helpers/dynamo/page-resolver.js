export default async (query, lastKey, limit) => {
  lastKey = typeof lastKey === 'string' ? JSON.parse(Buffer.from(lastKey, 'base64').toString('utf8')) : lastKey
  limit = parseInt(limit, 10)
  const items = []
  do {
    const page = await query.startAt(lastKey).limit(limit).exec()
    lastKey = page.lastKey
    items.push(...Array.from(page))
  } while (items.length < limit && lastKey)
  return {
    lastKey,
    items: items.splice(0, limit),
  }
}
