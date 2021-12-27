/* eslint-disable import/no-commonjs */
module.exports = async () => {
  const { WEB_APP_BUCKET_NAME } = require('config/resolve-dotenv')().environment
  const AWS = require('aws-sdk')
  const bucketExists = require('./s3/bucket-exists')
  const bucketExistsAndAccessible = require('./s3/bucket-exists-and-accessible')

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
