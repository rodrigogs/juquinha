/* eslint-disable import/no-commonjs */
const dynamoose = require('dynamoose')
const { USER_ROLES_TABLE_NAME } = require('config/env')

const schema = new dynamoose.Schema({
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
},
{
  saveUnknown: false,
  timestamps: true,
})

const UserRolesModel = dynamoose.model(USER_ROLES_TABLE_NAME, schema, {
  create: false,
  waitForActive: false,
})

module.exports = UserRolesModel
module.exports.default = UserRolesModel
module.exports.schema = schema
