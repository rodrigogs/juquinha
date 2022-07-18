import Model from '@juquinha/lib/helpers/model.mjs'
import { USER_ROLES_TABLE_NAME } from '@juquinha/config/env.mjs'

export default new Model(USER_ROLES_TABLE_NAME, {
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
