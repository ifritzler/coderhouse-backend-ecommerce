const createError = require('http-errors')
const { CartNotFoundException, NoStockProductException, ProductNotFoundInCartException } = require('../../services/cart/errors')

const cartInterceptor = (err, _req, _res, next) => {
  if (err instanceof CartNotFoundException) return next(createError(404, err.message))
  if (err instanceof ProductNotFoundInCartException) return next(createError(404, err.message))
  if (err instanceof NoStockProductException) return next(createError(400, err.message))
  throw err
}

module.exports = cartInterceptor
