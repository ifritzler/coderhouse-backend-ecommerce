import mongoose from 'mongoose'

const messagesSchema = new mongoose.Schema({
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
}, { versionKey: false, timestamps: true })

export const MessageModel = mongoose.model('Messages', messagesSchema)
