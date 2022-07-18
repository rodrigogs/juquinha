import Model from '@juquinha/lib/helpers/model.mjs'
import { USERS_TABLE_NAME } from '@juquinha/config/env.mjs'

export default new Model(USERS_TABLE_NAME, {
  id: { type: String, hashKey: true },
  name: { type: String, required: true },
  username: {
    type: String,
    required: true,
    index: {
      global: true,
      name: 'username-index',
    },
    validate: (val) => val && val.length >= 1 && val.length <= 60,
  },
  email: { type: String, required: true },
  picture: {
    type: String,
    validate: (val) => val && val.length >= 1 && val.length <= 2000,
  },
}, {
  optimisticLocking: true,
})
