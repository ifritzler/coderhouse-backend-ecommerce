import mongoose from 'mongoose'
import mongooseLeanVirtuals from 'mongoose-lean-virtuals'

export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
  PREMIUM: 'user_premium'
}

const usersSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        return /^[\w\-.]+@([\w-]+\.)+[\w-]{2,}$/gm.test(v)
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: ROLES.USER,
    enum: [ROLES.USER, ROLES.PREMIUM, ROLES.ADMIN]
  },
  name: {
    type: String
  },
  lastname: {
    type: String
  }
}, { versionKey: false, timestamps: true, virtuals: true })

usersSchema.virtual('fullname').get(function () {
  if (!this.name && !this.lastname) {
    return this.email.split('@')[0]
  } else {
    return `${this.name} ${this.lastname}`
  }
})

usersSchema.plugin(mongooseLeanVirtuals)

export const UserModel = mongoose.model('Users', usersSchema)
