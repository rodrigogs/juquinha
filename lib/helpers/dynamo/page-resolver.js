/**
 * @deprecated
 */
export default async (query, lastKey, limit) => {
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
