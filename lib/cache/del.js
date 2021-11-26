import getPartition from './get-partition'

export default async (partition, key) => (await getPartition(partition)).remove({ __key: key })
