import UsersModel from 'lib/models/users'

export default async (userId) => UsersModel.get(userId)
