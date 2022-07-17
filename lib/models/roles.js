/* eslint-disable import/no-commonjs */
const { ROLES_TABLE_NAME } = require('@juquinha/config/env')
const Model = require('@juquinha/lib/helpers/model')

module.exports = new Model(ROLES_TABLE_NAME, {
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
  optimisticLocking: true,
})
