import UsersModel from '@juquinha/lib/models/users'

export default async (userId) => UsersModel.get(userId)
