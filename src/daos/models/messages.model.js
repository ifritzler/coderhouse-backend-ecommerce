const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const messagesSchema = new Schema({
  user: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(v)
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
