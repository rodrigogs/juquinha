/* eslint-disable import/no-commonjs */
const dynamoose = require('dynamoose')
const { OptimisticLockingPlugin } = require('@rodrigogs/dynamoose-plugin-optimistic-locking')
const { PERMISSIONS_TABLE_NAME } = require('config/env')

const schema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
  },
  name: {
    type: String,
    required: true,
    index: {
      name: 'name-index',
      global: true,
    },
    validate: (val) => val && val.length >= 3 && val.length <= 100,
  },
  description: {
    type: String,
    validate: (val) => val && val.length >= 1 && val.length <= 400,
  },
  type: {
    type: String,
    required: true,
    enum: ['ALLOW', 'DENY'],
  },
  method: {
    type: String,
    required: true,
    enum: ['ALL', 'GET', 'POST', 'PUT', 'DELETE'],
  },
  path: {
    type: String,
    required: true,
  },
},
{
  saveUnknown: false,
  timestamps: true,
})

const PermissionsModel = dynamoose.model(PERMISSIONS_TABLE_NAME, schema, {
  create: false,
  waitForActive: false,
})

PermissionsModel.plugin(OptimisticLockingPlugin, { fetchItemOnWriteError: true })

module.exports = PermissionsModel
module.exports.default = PermissionsModel
module.exports.schema = schema
