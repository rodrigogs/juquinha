import AWS from 'aws-sdk'

const s3 = new AWS.S3()

export default async (bucketName) => {
  try {
    await s3.headBucket({ Bucket: bucketName }).promise()
    return true
  } catch (err) {
    if (err.statusCode === 403) {
      return true
    }
    if (err.statusCode >= 400 && err.statusCode < 500) {
      return false
    }
    throw err
  }
}
