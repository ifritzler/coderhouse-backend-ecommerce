import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
  products: {
    type: [{
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Products',
        required: true
      },
      quantity: {
        type: Number,
        required: false,
        min: 1,
        default: 1
      }
    }],
    default: [],
    require: true
  }
}, { versionKey: false, expireAfterSeconds: 30 * 24 * 60 * 60 })

export const CartModel = mongoose.model('Carts', cartSchema)
