export default async () => {
  const { WEB_APP_BUCKET_NAME } = ((await import('@juquinha/config/resolve-dotenv.mjs')).default()).environment
  const AWS = (await import('aws-sdk')).default
  const bucketExists = (await import('./s3/bucket-exists.mjs')).default
  const bucketExistsAndAccessible = (await import('./s3/bucket-exists-and-accessible.mjs')).default

  const createBucket = async (bucketName) => {
    const s3 = new AWS.S3()
    const params = {
      Bucket: bucketName,
      ACL: 'private',
    }
    await s3.createBucket(params).promise()
  }

  const bucketExistsResult = await bucketExists(WEB_APP_BUCKET_NAME)
  if (!bucketExistsResult) await createBucket(WEB_APP_BUCKET_NAME)
  const hasAccessToBucket = await bucketExistsAndAccessible(WEB_APP_BUCKET_NAME)
  if (!hasAccessToBucket) { throw new Error(`Web APP bucket ${WEB_APP_BUCKET_NAME} is not accessible`) }
}
