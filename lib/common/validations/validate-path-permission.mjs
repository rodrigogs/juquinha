import ForbiddenError from '../../errors/api/forbidden.mjs'

const getMethodRules = (method, permissions) =>
  permissions.filter((permission) => permission.method === method || permission.method === 'ALL')

const getDeniedRules = (permissions) =>
  permissions.filter((permission) => permission.type === 'DENY')

const getAllowedRules = (permissions) =>
  permissions.filter((permission) => permission.type === 'ALLOW')

const validatePath = (method, path, permissions, deny) => {
  for (const permission of permissions) {
    const regex = new RegExp(permission.path)
    const test = regex.test(path)
    if (test) {
      if (deny) {
        throw new ForbiddenError(
          `Permission "${permission.name}" denied access for method "${method}", path "${path}"`,
        )
      }
      return true
    }
  }
  if (!deny) { throw new ForbiddenError(`No permission found for method "${method}" with path "${path}"`) }
  return true
}

export default (method, path, permissions) => {
  if (!permissions || !permissions.length) throw new ForbiddenError()
  const methodRules = getMethodRules(method, permissions)
  if (!methodRules || !methodRules.length) throw new ForbiddenError()
  const deniedRules = getDeniedRules(methodRules)
  const allowedRules = getAllowedRules(methodRules)
  validatePath(method, path, deniedRules, true)
  validatePath(method, path, allowedRules, false)
}
