import { APP_PREFIX } from 'config/env'
import RecipeBuilder from 'lib/helpers/recipe-builder'

module.exports = new RecipeBuilder()
  .setService(`${APP_PREFIX}-resources-db`)
  .setCustom('accessLogsTableName', '${self:custom.appPrefix}-${self:provider.stage}-access-logs-table')
  .setCustom('usersTableName', '${self:custom.appPrefix}-${self:provider.stage}-users-table')
  .setCustom('rolesTableName', '${self:custom.appPrefix}-${self:provider.stage}-roles-table')
  .setCustom('permissionsTableName', '${self:custom.appPrefix}-${self:provider.stage}-permissions-table')
  .setCustom('userRolesTableName', '${self:custom.appPrefix}-${self:provider.stage}-user-roles-table')
  .setCustom('rolePermissionsTableName', '${self:custom.appPrefix}-${self:provider.stage}-role-permissions-table')
  .addResource('AccessLogsTable', {
    Type: 'AWS::DynamoDB::Table',
    // DeletionPolicy: 'Retain',
    Properties: {
      TableName: '${self:custom.accessLogsTableName}',
      AttributeDefinitions: [
        {
          AttributeName: 'requestHash',
          AttributeType: 'S',
        },
        {
          AttributeName: 'occurredAt',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'requestHash',
          KeyType: 'HASH',
        },
        {
          AttributeName: 'occurredAt',
          KeyType: 'RANGE',
        },
      ],
      BillingMode: 'PAY_PER_REQUEST',
    },
  })
  .addResource('UsersTable', {
    Type: 'AWS::DynamoDB::Table',
    // DeletionPolicy: 'Retain',
    Properties: {
      TableName: '${self:custom.usersTableName}',
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S',
        },
        {
          AttributeName: 'username',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'id',
          KeyType: 'HASH',
        },
      ],
      BillingMode: 'PAY_PER_REQUEST',
      GlobalSecondaryIndexes: [
        {
          IndexName: 'username-index',
          KeySchema: [
            {
              AttributeName: 'username',
              KeyType: 'HASH',
            },
          ],
          Projection: {
            ProjectionType: 'ALL',
          },
        },
      ],
    },
  })
  .addResource('RolesTable', {
    Type: 'AWS::DynamoDB::Table',
    // DeletionPolicy: 'Retain',
    Properties: {
      TableName: '${self:custom.rolesTableName}',
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S',
        },
        {
          AttributeName: 'name',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'id',
          KeyType: 'HASH',
        },
      ],
      BillingMode: 'PAY_PER_REQUEST',
      GlobalSecondaryIndexes: [
        {
          IndexName: 'name-index',
          KeySchema: [
            {
              AttributeName: 'name',
              KeyType: 'HASH',
            },
          ],
          Projection: {
            ProjectionType: 'ALL',
          },
        },
      ],
    },
  })
  .addResource('PermissionsTable', {
    Type: 'AWS::DynamoDB::Table',
    // DeletionPolicy: 'Retain',
    Properties: {
      TableName: '${self:custom.permissionsTableName}',
      AttributeDefinitions: [
        {
          AttributeName: 'id',
          AttributeType: 'S',
        },
        {
          AttributeName: 'name',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'id',
          KeyType: 'HASH',
        },
      ],
      BillingMode: 'PAY_PER_REQUEST',
      GlobalSecondaryIndexes: [
        {
          IndexName: 'name-index',
          KeySchema: [
            {
              AttributeName: 'name',
              KeyType: 'HASH',
            },
          ],
          Projection: {
            ProjectionType: 'ALL',
          },
        },
      ],
    },
  })
  .addResource('UserRolesTable', {
    Type: 'AWS::DynamoDB::Table',
    // DeletionPolicy: 'Retain',
    Properties: {
      TableName: '${self:custom.userRolesTableName}',
      AttributeDefinitions: [
        {
          AttributeName: 'userId',
          AttributeType: 'S',
        },
        {
          AttributeName: 'roleId',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'userId',
          KeyType: 'HASH',
        },
        {
          AttributeName: 'roleId',
          KeyType: 'RANGE',
        },
      ],
      BillingMode: 'PAY_PER_REQUEST',
      GlobalSecondaryIndexes: [
        {
          IndexName: 'role-users-index',
          KeySchema: [
            {
              AttributeName: 'roleId',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'userId',
              KeyType: 'RANGE',
            },
          ],
          Projection: {
            ProjectionType: 'ALL',
          },
        },
      ],
    },
  })
  .addResource('RolePermissionsTable', {
    Type: 'AWS::DynamoDB::Table',
    // DeletionPolicy: 'Retain',
    Properties: {
      TableName: '${self:custom.rolePermissionsTableName}',
      AttributeDefinitions: [
        {
          AttributeName: 'roleId',
          AttributeType: 'S',
        },
        {
          AttributeName: 'permissionId',
          AttributeType: 'S',
        },
      ],
      KeySchema: [
        {
          AttributeName: 'roleId',
          KeyType: 'HASH',
        },
        {
          AttributeName: 'permissionId',
          KeyType: 'RANGE',
        },
      ],
      BillingMode: 'PAY_PER_REQUEST',
      GlobalSecondaryIndexes: [
        {
          IndexName: 'permission-roles-index',
          KeySchema: [
            {
              AttributeName: 'permissionId',
              KeyType: 'HASH',
            },
            {
              AttributeName: 'roleId',
              KeyType: 'RANGE',
            },
          ],
          Projection: {
            ProjectionType: 'ALL',
          },
        },
      ],
    },
  })
  .build()
