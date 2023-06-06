const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const messagesSchema = new Schema({
  user: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/gm.test(v)
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  message: {
    type: String,
    required: true
  }
}, { versionKey: false })

const MessageModel = mongoose.model('Messages', messagesSchema)
module.exports = MessageModel
