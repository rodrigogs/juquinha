import AWS from 'aws-sdk'
import { DEPLOYMENT_BUCKET_NAME } from '@juquinha/config/env.mjs'
import bucketExists from './s3/bucket-exists.mjs'
import bucketExistsAndAccessible from './s3/bucket-exists-and-accessible.mjs'

const s3 = new AWS.S3()

const createBucket = async (bucketName) => {
  const params = {
    Bucket: bucketName,
    ACL: 'private',
  }
  await s3.createBucket(params).promise()
}

export default async () => {
  const bucketExistsResult = await bucketExists(DEPLOYMENT_BUCKET_NAME)
  if (!bucketExistsResult) await createBucket(DEPLOYMENT_BUCKET_NAME)
  const hasAccessToBucket = await bucketExistsAndAccessible(DEPLOYMENT_BUCKET_NAME)
  if (!hasAccessToBucket) { throw new Error(`Deployment bucket ${DEPLOYMENT_BUCKET_NAME} is not accessible`) }
}
