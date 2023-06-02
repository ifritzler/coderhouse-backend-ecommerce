const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const cartSchema = new Schema({
  products: {
    type: [{
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Products',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1
      }
    }],
    default: [],
    require: true
  }
}, { versionKey: false })

const CartModel = mongoose.model('Carts', cartSchema)
module.exports = CartModel
