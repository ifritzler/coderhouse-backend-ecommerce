const ApplicationError = require('../../exceptions/ApplicationError.js')
const { CartNotFoundException, ProductNotFoundInCartException } = require('../../exceptions/cart.exceptions.js')

/**
 * Interceptor for handling cart-related exceptions.
 * @class
*/
class CartsInterceptor {
  static intercept (err, _req, _res, next) {
    if (err instanceof CartNotFoundException) return next(new ApplicationError(err.message, 404))
    if (err instanceof ProductNotFoundInCartException) return next(new ApplicationError(err.message, 404))
    throw err
  }
}

module.exports = CartsInterceptor
