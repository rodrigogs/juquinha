/* eslint-disable no-process-env,import/no-commonjs */
const path = require('path')
const dotenv = require('dotenv')

if (process.env.STAGE === 'dev') Error.stackTraceLimit = Infinity

const dotenvFile =
  {
    prod: '.env.prod',
    dev: '.env',
    test: '.env.test',
  }[process.env.STAGE] || '.env'

dotenv.config({ path: path.resolve(__dirname, '..', dotenvFile) })

// Resolve hoisted properties
const getEnv = (envName, defaultValue) => process.env[envName] || defaultValue

const {
  ORG_NAME = getEnv('ORG_NAME', 'mmw'),
  APP_NAME = getEnv('APP_NAME', 'juquinha'),
  APP_PREFIX = getEnv('APP_PREFIX', 'mmw'),
  API_URL = getEnv('API_URL', 'https://my-api.com/dev'),
  SERVICE_NAME = getEnv('SERVICE_NAME', ''),
  DEPLOYMENT_BUCKET_NAME = getEnv('DEPLOYMENT_BUCKET_NAME', 'mmw-deployments'),
  STAGE = getEnv('STAGE', 'dev'),
  REGION = getEnv('AWS_REGION', getEnv('REGION', 'us-east-2')),
  DEFAULT_LANGUAGE = getEnv('DEFAULT_LANGUAGE', 'en'),
  USERS_TABLE_NAME = getEnv('USERS_TABLE_NAME', `${APP_PREFIX}-${STAGE}-users-table`),
  ROLES_TABLE_NAME = getEnv('ROLES_TABLE_NAME', `${APP_PREFIX}-${STAGE}-roles-table`),
  USER_ROLES_TABLE_NAME = getEnv('USER_ROLES_TABLE_NAME', `${APP_PREFIX}-${STAGE}-user-roles-table`),
  PERMISSIONS_TABLE_NAME = getEnv(
    'PERMISSIONS_TABLE_NAME',
    `${APP_PREFIX}-${STAGE}-permissions-table`,
  ),
  ROLE_PERMISSIONS_TABLE_NAME = getEnv(
    'ROLE_PERMISSIONS_TABLE_NAME',
    `${APP_PREFIX}-${STAGE}-role-permissions-table`,
  ),
  ACCESS_LOGS_TABLE_NAME = getEnv(
    'ACCESS_LOGS_TABLE_NAME',
    `${APP_PREFIX}-${STAGE}-access-logs-table`,
  ),
} = process.env

module.exports = Object.freeze({
  ORG_NAME,
  APP_NAME,
  APP_PREFIX,
  API_URL,
  SERVICE_NAME,
  DEPLOYMENT_BUCKET_NAME,
  STAGE,
  REGION,
  DEFAULT_LANGUAGE,
  USERS_TABLE_NAME,
  ROLES_TABLE_NAME,
  USER_ROLES_TABLE_NAME,
  PERMISSIONS_TABLE_NAME,
  ROLE_PERMISSIONS_TABLE_NAME,
  ACCESS_LOGS_TABLE_NAME,
})
