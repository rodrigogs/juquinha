import UsersModel from 'lib/models/users'

export default (username) =>
  UsersModel.query('username')
    .using('username-index')
    .eq(username)
    .limit(1)
    .exec()
    .then((results) => results && results.length && { ...results[0], password: undefined })
