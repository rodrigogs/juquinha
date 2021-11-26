/* eslint-disable import/no-commonjs */
const dynamoose = require('dynamoose')
const { ACCESS_LOGS_TABLE_NAME } = require('config/env')

const schema = new dynamoose.Schema({
  requestHash: {
    type: String,
    required: true,
    hashKey: true,
    forceDefault: true,
    default: (model) => model.method + model.path,
  },
  occurredAt: { type: String, required: true, rangeKey: true },
  method: { type: String, required: true },
  path: { type: String, required: true, hashKey: true },
  pathParams: { type: String },
  queryParams: { type: String },
  body: { type: String },
  statusCode: { type: Number, required: true },
  errorMessage: { type: String },
})

const AccessLogsModel = dynamoose.model(ACCESS_LOGS_TABLE_NAME, schema, {
  create: false,
  waitForActive: false,
})

module.exports = AccessLogsModel
module.exports.default = AccessLogsModel
module.exports.schema = schema
