import UsersModel from '@juquinha/lib/models/users.mjs'

export default async (userId) => UsersModel.get(userId)
