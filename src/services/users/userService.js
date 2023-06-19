import { UserModel } from '../../daos/models/users.model.js'
import bcrypt from 'bcrypt'

class UserService {
  async getUsers (params) {
    try {
      return await UserModel.find({}).lean()
    } catch (error) {
      return []
    }
  }

  async getUserById (id) {

  }

  async getUserByEmail (email) {
    return await UserModel.findOne({ email }).lean({ virtuals: true })
  }

  async deleteUser (id) {
  }

  async createUser (data) {
    const userData = { ...data, password: bcrypt.hashSync(data.password, 10) }
    return await UserModel.create(userData)
  }

  async updateUser (id, changes) {

  }
}

export default new UserService()
