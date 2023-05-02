const ApplicationError = require('../app/exceptions/ApplicationError.js')
const { CartNotFoundException, ProductNotFoundInCartException } = require('./carts.exceptions.js')

/**
 * Interceptor for handling cart-related exceptions. * @class
 */
class CartsInterceptor {
  /**
     * Intercepts cart-related exceptions and maps them to appropriate HTTP error codes.
     */
  static intercept (err, _req, _res, next) {
    if (
      err instanceof CartNotFoundException ||
            err instanceof ProductNotFoundInCartException
    ) {
      return next(new ApplicationError(err.message, 404))
    }
    throw err
  }
}

module.exports = CartsInterceptor
