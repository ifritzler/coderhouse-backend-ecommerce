const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  code: {
    type: String,
    unique: true
  },
  price: {
    type: Number,
    min: 0
  },
  thumbnails: {
    type: [String],
    default: ['/thumbnails/placeholder.jpg'],
    min: [3, 'Must be at least 3 thumbnails, got {VALUE}']
  },
  stock: Number,
  status: {
    type: Boolean,
    default: true
  },
  categories: [String]
}, {
  strict: true,
  versionKey: false
})

const ProductModel = mongoose.model('Products', productSchema)
module.exports = ProductModel
