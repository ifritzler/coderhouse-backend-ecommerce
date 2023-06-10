import { MessageModel } from '../../daos/models/messages.model.js'

class MessageManager {
  async getMessages (limit) {
    try {
      return await MessageModel.find({}).limit(limit).lean()
    } catch {
      return []
    }
  }

  async createMessage (message) {
    const newMessage = await MessageModel.create(message)
    return JSON.parse(JSON.stringify(newMessage))
  }
}

export default new MessageManager()
