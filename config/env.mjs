import resolveDotenv from './resolve-dotenv.mjs'

const { environment } = resolveDotenv()

if (environment.STAGE === 'dev') Error.stackTraceLimit = Infinity

// Resolve hoisted properties
const getEnv = (envName, defaultValue) => environment[envName] || defaultValue

export const {
  ORG_NAME = getEnv('ORG_NAME', undefined),
  APP_NAME = getEnv('APP_NAME', 'juquinha'),
  APP_PREFIX = getEnv('APP_PREFIX', 'ju'),
  STAGE = getEnv('STAGE', 'dev'),
  API_URL = getEnv('API_URL', 'https://my-api.com/dev'),
  DOMAIN_NAME = getEnv('DOMAIN_NAME', ''),
  SERVICE_NAME = getEnv('SERVICE_NAME', ''),
  DEPLOYMENT_BUCKET_NAME = getEnv('DEPLOYMENT_BUCKET_NAME', 'juquinha-deployments'),
  WEB_APP_BUCKET_NAME = getEnv('WEB_APP_BUCKET_NAME', `${APP_NAME}-${STAGE}-webapp`),
  REGION = getEnv('AWS_REGION', getEnv('REGION', 'us-east-2')),
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
} = environment

export default {
  ORG_NAME,
  APP_NAME,
  APP_PREFIX,
  STAGE,
  API_URL,
  DOMAIN_NAME,
  SERVICE_NAME,
  DEPLOYMENT_BUCKET_NAME,
  WEB_APP_BUCKET_NAME,
  REGION,
  USERS_TABLE_NAME,
  ROLES_TABLE_NAME,
  USER_ROLES_TABLE_NAME,
  PERMISSIONS_TABLE_NAME,
  ROLE_PERMISSIONS_TABLE_NAME,
  ACCESS_LOGS_TABLE_NAME,
}
