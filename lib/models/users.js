/* eslint-disable import/no-commonjs */
const { USERS_TABLE_NAME } = require('config/env')
const Model = require('lib/helpers/model')

module.exports = new Model(USERS_TABLE_NAME, {
  id: { type: String, hashKey: true },
  name: { type: String, required: true },
  username: {
    type: String,
    required: true,
    index: {
      global: true,
      name: 'username-index',
    },
    validate: (val) => val && val.length >= 1 && val.length <= 30,
  },
  email: { type: String, required: true },
  picture: {
    type: String,
    validate: (val) => val && val.length >= 1 && val.length <= 2000,
  },
}, {
  optimisticLocking: true,
})
