import path from 'path'
import fs from 'fs'
import Datastore from 'nedb-promises'

const dirExists = (dir) =>
  fs.promises
    .access(dir, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false)

const resolveBasePath = async () => {
  const efsDriveDir = path.resolve('/', 'mnt', 'efs_drive')
  if (await dirExists(efsDriveDir)) return efsDriveDir
  const tempDir = path.resolve('/', 'tmp')
  if (await dirExists(tempDir)) return tempDir
  throw new Error('Unable to use cache')
}

export default async (partition) => {
  const basePath = await resolveBasePath()
  const cacheDir = path.resolve(basePath, 'cache')
  if (!(await dirExists(cacheDir))) await fs.promises.mkdir(cacheDir)
  const partitionFile = path.resolve(cacheDir, `${partition}.db`)
  const database = await new Datastore({
    filename: partitionFile,
    autoload: true,
    timestampData: true,
  })
  await database.ensureIndex({ fieldName: '__key' })
  await database.ensureIndex({ fieldName: 'createdAt', expireAfterSeconds: 300 })
  return database
}
