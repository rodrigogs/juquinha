import getPartition from './get-partition'

export default async (partition, key) => {
  const part = await getPartition(partition)
  if (!part) return undefined
  const cached = await part.findOne({ __key: key })
  if (!cached) return undefined
  return cached.value
}
