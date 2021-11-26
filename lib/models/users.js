/* eslint-disable import/no-commonjs */
const dynamoose = require('dynamoose')
const { OptimisticLockingPlugin } = require('@rodrigogs/dynamoose-plugin-optimistic-locking')
const { USERS_TABLE_NAME } = require('config/env')

const schema = new dynamoose.Schema({
  id: {
    type: String,
    hashKey: true,
  },
  idMetacem: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    index: {
      name: 'username-index',
      global: true,
    },
    validate: (val) => val && val.length >= 1 && val.length <= 15,
  },
  name: {
    type: String,
    validate: (val) => val && val.length >= 3 && val.length <= 100,
  },
  email: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    validate: (val) => val && val.length >= 1 && val.length <= 2000,
  },
  // master flag should always be altered in DynamoDB console https://console.aws.amazon.com/dynamodbv2/home?region=us-east-2#table?name=prime-demo-dev-users-table
  // Never programmatically
  master: {
    type: Boolean,
    default: false,
  },
},
{
  saveUnknown: false,
  timestamps: true,
})

const UsersModel = dynamoose.model(USERS_TABLE_NAME, schema, {
  create: false,
  waitForActive: false,
})

UsersModel.plugin(OptimisticLockingPlugin, { fetchItemOnWriteError: true })

module.exports = UsersModel
module.exports.default = UsersModel
module.exports.schema = schema
