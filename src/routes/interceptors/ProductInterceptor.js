const ApplicationError = require('../../exceptions/ApplicationError.js')
const { ProductNotFoundException, ProductCodeDuplicatedException, ProductValidationError } = require('../../exceptions/product.exceptions.js')

/**
 * Interceptor for handling product-related exceptions.
 * @class
*/
class ProductInterceptor {
  static intercept (err, _req, _res, next) {
    if (err instanceof ProductNotFoundException) return next(new ApplicationError(err.message, 404))
    if (err instanceof ProductCodeDuplicatedException) return next(new ApplicationError(err.message, 409))
    if (err instanceof ProductValidationError) return next(new ApplicationError(err.message, 400))

    throw err
  }
}

module.exports = ProductInterceptor
