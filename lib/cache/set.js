import getPartition from './get-partition'

export default (partition, key, value) =>
  getPartition(partition).then((part) =>
    part.insert({
      __key: key,
      value,
    }),
  )
