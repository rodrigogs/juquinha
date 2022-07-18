import RolesModel from '@juquinha/lib/models/roles.mjs'

export default (username) =>
  RolesModel.query('name')
    .using('name-index')
    .eq(username)
    .limit(1)
    .exec()
    .then((results) => results && results.length > 0 && { ...results[0] })
