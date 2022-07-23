import { ROLE_PERMISSIONS_TABLE_NAME } from '@juquinha/config/env.mjs'
import Model from '@juquinha/lib/helpers/model.mjs'

export default new Model(ROLE_PERMISSIONS_TABLE_NAME, {
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
