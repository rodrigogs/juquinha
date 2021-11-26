import UsersModel from 'lib/models/users'

export default async (userId) => {
  let user = await UsersModel.get(userId)
  if (user) return user
  user.id = user.id || user.user_id
  if (user) user = await UsersModel.create(user)
  return { ...user, password: undefined }
}
