const MessagesModel = require('../../daos/models/messages.model')

class MessageManager {
  async getMessages (limit) {
    try {
      return await MessagesModel.find({}).limit(limit).lean()
    } catch {
      return []
    }
  }

  async createMessage (message) {
    const newMessage = await MessagesModel.create(message)
    return JSON.parse(JSON.stringify(newMessage))
  }
}

module.exports = new MessageManager()
