/* eslint-disable import/no-commonjs */
const { WEB_APP_BUCKET_NAME } = require('config/env')
const AWS = require('aws-sdk')
const bucketExists = require('./s3/bucket-exists')
const bucketExistsAndAccessible = require('./s3/bucket-exists-and-accessible')

const s3 = new AWS.S3()

const createBucket = async (bucketName) => {
  const params = {
    Bucket: bucketName,
    ACL: 'private',
  }
  await s3.createBucket(params).promise()
}

module.exports = async () => {
  const bucketExistsResult = await bucketExists(WEB_APP_BUCKET_NAME)
  if (!bucketExistsResult) await createBucket(WEB_APP_BUCKET_NAME)
  const hasAccessToBucket = await bucketExistsAndAccessible(WEB_APP_BUCKET_NAME)
  if (!hasAccessToBucket) { throw new Error(`Web APP bucket ${WEB_APP_BUCKET_NAME} is not accessible`) }
}
