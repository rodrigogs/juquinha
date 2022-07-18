import getPartition from './get-partition.mjs'

export default async (partition, key) => (await getPartition(partition)).remove({ __key: key })
