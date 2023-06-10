import { ProductValidationError } from '../../services/product/errors.js'
import { deleteThumbnails } from '../../utils.js'

export async function productCreateValidation (req, res, next) {
  const data = req.body
  const files = req.files
  let thumbnails
  if (files && files.length > 0) {
    thumbnails = files.map(file => `/thumbnails/${file.filename}`)
  } else {
    thumbnails = ['/thumbnails/placeholder.jpg']
  }
  if (data.title && data.description && data.code && data.price && data.categories && data.stock) {
    req.body = {
      title: data.title,
      description: data.description,
      code: data.code,
      thumbnails,
      price: +data.price,
      categories: data.categories.trim().split(','),
      stock: +data.stock,
      status: data.status === 'on'
    }
    next()
  } else {
    await deleteThumbnails(thumbnails)
    throw new ProductValidationError()
  }
}

export function productUpdateValidation (req, res, next) {
  const data = req.body
  if (data.title || data.description || data.code || data.price || data.category || data.stock) {
    req.body = {}
    if (data.title) req.body.title = data.title
    if (data.description) req.body.description = data.description
    if (data.code) req.body.code = data.code
    if (data.price) req.body.price = +data.price
    if (data.category) req.body.category = data.category
    if (data.stock) req.body.stock = +data.stock
    if (typeof data.status !== 'undefined') req.status = data.status
    return next()
  }
  throw new ProductValidationError()
}
