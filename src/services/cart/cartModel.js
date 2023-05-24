const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const cartSchema = mongoose.Schema({
  products: [{
    id: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
    quantity: {
      type: Number,
      required: true
    }
  }]
}, { versionKey: false })

const CartModel = mongoose.model('Cart', cartSchema)
module.exports = CartModel
