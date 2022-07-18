#!/usr/bin/env nodejs
import '@juquinha/config/env'

import AWS from 'aws-sdk'
import promisePool from '@juquinha/lib/node_modules/@rodrigogs/promise-pool'

const cloudWatchLogs = new AWS.CloudWatchLogs()

async function * generateLogGroups ({ logGroupNamePrefix, limit }) {
  let nextToken
  let logGroups
  do {
    ;({ nextToken, logGroups } = await cloudWatchLogs
      .describeLogGroups({
        limit,
        logGroupNamePrefix,
        nextToken,
      })
      .promise())
    yield * logGroups
  } while (nextToken)
}

async function * generateLogStreams ({ logGroupName, limit }) {
  let nextToken
  let logStreams
  do {
    ;({ nextToken, logStreams } = await cloudWatchLogs
      .describeLogStreams({
        limit,
        logGroupName,
        nextToken,
      })
      .promise())
    yield * logStreams
  } while (nextToken)
}

const logStreamProcessor = (logGroup) => async (logStream) => {
  await cloudWatchLogs
    .deleteLogStream({
      logGroupName: logGroup.logGroupName,
      logStreamName: logStream.logStreamName,
    })
    .promise()
  console.log(`Deleted ${logGroup.logGroupName} - ${logStream.logStreamName}`)
}

const logGroupProcessor = (logGroup) =>
  promisePool({
    generator: generateLogStreams({
      logGroupName: logGroup.logGroupName,
      limit: 50,
    }),
    concurrency: 5,
    processor: logStreamProcessor(logGroup),
  })

try {
  await promisePool({
    generator: generateLogGroups({ logGroupNamePrefix: '/', limit: 50 }),
    concurrency: 3,
    processor: logGroupProcessor,
  })
} catch (err) {
  console.error(err)
}
