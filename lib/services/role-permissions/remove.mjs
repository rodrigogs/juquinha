import RolePermissionsModel from '@juquinha/lib/models/role-permissions.mjs'

export default ({ roleId, permissionId }) => RolePermissionsModel.delete({ roleId, permissionId })
