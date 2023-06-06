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
    return await MessagesModel.create(message)
  }
}

module.exports = new MessageManager()
