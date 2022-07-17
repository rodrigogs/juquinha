/* eslint-disable import/no-commonjs */
const { ACCESS_LOGS_TABLE_NAME } = require('@juquinha/config/env')
const Model = require('@juquinha/lib/helpers/model')

module.exports = new Model(ACCESS_LOGS_TABLE_NAME, {
  requestHash: {
    type: {
      value: 'Combine',
      settings: {
        attributes: ['method', 'path'],
        separator: '-',
      },
    },
    required: true,
    hashKey: true,
  },
  occurredAt: { type: String, required: true, rangeKey: true },
  method: { type: String, required: true },
  path: { type: String, required: true },
  pathParams: { type: String },
  queryParams: { type: String },
  body: { type: String },
  statusCode: { type: Number, required: true },
  errorMessage: { type: String },
}, {})
