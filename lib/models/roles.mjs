import Model from '@juquinha/lib/helpers/model.mjs'
import { ROLES_TABLE_NAME } from '@juquinha/config/env.mjs'

export default new Model(ROLES_TABLE_NAME, {
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
