/* eslint-disable import/no-commonjs */
const UsersModel = require('./users')
const RolesModel = require('./roles')
const UserRolesModel = require('./user-roles')
const PermissionsModel = require('./permissions')
const RolePermissionsModel = require('./role-permissions')
const AccessLogsModel = require('./access-logs')

module.exports = {
  UsersModel,
  RolesModel,
  UserRolesModel,
  PermissionsModel,
  RolePermissionsModel,
  AccessLogsModel,
}
