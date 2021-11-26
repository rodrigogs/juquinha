/* eslint-disable import/no-commonjs */
const dynamoose = require('dynamoose')
const { OptimisticLockingPlugin } = require('@rodrigogs/dynamoose-plugin-optimistic-locking')
const { ROLE_PERMISSIONS_TABLE_NAME } = require('config/env')

const schema = new dynamoose.Schema({
  roleId: {
    type: String,
    hashKey: true,
  },
  permissionId: {
    type: String,
    required: true,
    rangeKey: true,
    index: {
      name: 'permission-roles-index',
      rangeKey: 'roleId',
      global: true,
      project: true,
    },
  },
},
{
  saveUnknown: false,
  timestamps: true,
})

const RolePermissionsModel = dynamoose.model(ROLE_PERMISSIONS_TABLE_NAME, schema, {
  create: false,
  waitForActive: false,
})

RolePermissionsModel.plugin(OptimisticLockingPlugin, { fetchItemOnWriteError: true })

module.exports = RolePermissionsModel
module.exports.default = RolePermissionsModel
module.exports.schema = schema
