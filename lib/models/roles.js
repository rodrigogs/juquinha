/* eslint-disable import/no-commonjs */
const dynamoose = require('dynamoose')
const { OptimisticLockingPlugin } = require('@rodrigogs/dynamoose-plugin-optimistic-locking')
const { ROLES_TABLE_NAME } = require('config/env')

const schema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
  },
  name: {
    type: String,
    index: {
      name: 'name-index',
      global: true,
    },
    validate: (val) => val && val.length >= 3 && val.length <= 100,
  },
  description: {
    type: String,
    validate: (val) => val && val.length >= 3 && val.length <= 300,
  },
},
{
  saveUnknown: false,
  timestamps: true,
})

const RolesModel = dynamoose.model(ROLES_TABLE_NAME, schema, {
  create: false,
  waitForActive: false,
})

RolesModel.plugin(OptimisticLockingPlugin, { fetchItemOnWriteError: true })

module.exports = RolesModel
module.exports.default = RolesModel
module.exports.schema = schema
