/* eslint-disable import/no-commonjs */
const { default: UsersModel, schema: UsersSchema } = require('./users')
const { default: RolesModel, schema: RolesSchema } = require('./roles')
const { default: UserRolesModel, schema: UserRolesSchema } = require('./user-roles')
const { default: PermissionsModel, schema: PermissionsSchema } = require('./permissions')
const {
  default: RolePermissionsModel,
  schema: RolePermissionsSchema,
} = require('./role-permissions')
const { default: AccessLogsModel, schema: AccessLogsSchema } = require('./access-logs')

module.exports = {
  UsersModel,
  UsersSchema,
  RolesModel,
  RolesSchema,
  UserRolesModel,
  UserRolesSchema,
  PermissionsModel,
  PermissionsSchema,
  RolePermissionsModel,
  RolePermissionsSchema,
  AccessLogsModel,
  AccessLogsSchema,
}
