/* eslint-disable import/no-commonjs */
const { ROLE_PERMISSIONS_TABLE_NAME } = require('config/env')
const Model = require('lib/helpers/model')

module.exports = new Model(ROLE_PERMISSIONS_TABLE_NAME, {
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
}, {})
