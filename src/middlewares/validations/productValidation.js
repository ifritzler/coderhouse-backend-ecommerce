const { ProductValidationError } = require('../../services/product/errors')

function productCreateValidation (req, res, next) {
  const data = req.body
  const files = req.files
  console.log(req.files)
  if (data.title && data.description && data.code && data.price && data.category && data.stock) {
    if (files && files.length > 0) {
      data.thumbnails = files.map(file => `/thumbnails/${file.filename}`)
    } else {
      data.thumbnails = ['/thumbnails/placeholder.jpg']
    }
    req.body = {
      title: data.title,
      description: data.description,
      code: data.code,
      thumbnails: data.thumbnails,
      price: +data.price,
      category: data.category,
      stock: +data.stock,
      status: data.status === 'on'
    }
    next()
  } else {
    throw new ProductValidationError()
  }
}

function productUpdateValidation (req, res, next) {
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
    next()
  }
  throw new ProductValidationError()
}

module.exports = { productCreateValidation, productUpdateValidation }
