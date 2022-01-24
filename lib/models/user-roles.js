/* eslint-disable import/no-commonjs */
const Model = require('lib/helpers/model')
const { USER_ROLES_TABLE_NAME } = require('config/env')

module.exports = new Model(USER_ROLES_TABLE_NAME, {
  userId: {
    type: String,
    hashKey: true,
  },
  roleId: {
    type: String,
    required: true,
    rangeKey: true,
    index: {
      name: 'role-users-index',
      rangeKey: 'userId',
      global: true,
      project: true,
    },
  },
}, {})
