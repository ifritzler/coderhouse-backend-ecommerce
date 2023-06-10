import mongoose from 'mongoose'
import mongoosePaginate from 'mongoose-paginate-v2'

const productSchema = new mongoose.Schema({
  title: {
    type: String
  },
  description: {
    type: String
  },
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
  categories: {
    type: [String]
  }
}, {
  strict: true,
  versionKey: false
})

productSchema.plugin(mongoosePaginate)
productSchema.index({ categories: 'text' })

export const ProductModel = mongoose.model('Products', productSchema)
