/* eslint-disable import/no-commonjs */
const { PERMISSIONS_TABLE_NAME } = require('@juquinha/config/env')
const Model = require('@juquinha/lib/helpers/model')

module.exports = new Model(PERMISSIONS_TABLE_NAME, {
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
  optimisticLocking: true,
})
