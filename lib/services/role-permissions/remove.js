import RolePermissionsModel from '@juquinha/lib/models/role-permissions'

export default ({ roleId, permissionId }) => RolePermissionsModel.delete({ roleId, permissionId })
