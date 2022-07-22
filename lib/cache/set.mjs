import getPartition from './get-partition.mjs'

export default (partition, key, value) =>
  getPartition(partition).then((part) =>
    part.insert({
      __key: key,
      value,
    }),
  )
