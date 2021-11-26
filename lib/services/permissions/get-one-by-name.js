import PermissionsModel from 'lib/models/permissions'

export default (name) =>
  PermissionsModel.query('name')
    .using('name-index')
    .eq(name)
    .limit(1)
    .exec()
    .then((results) => results && results.length && results[0])
