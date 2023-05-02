import ApplicationError from '../app/exceptions/ApplicationError.js'
import { ProductNotFoundException, ProductCodeDuplicatedException, ProductValidationError } from './products.exceptions.js'

/**
 * Interceptor for handling product-related exceptions.
 */
class ProductsInterceptor {
  /**
     * Intercepts product-related exceptions and maps them to appropriate HTTP error codes.
     */
  static intercept (err, _req, _res, next) {
    if (err instanceof ProductNotFoundException) return next(new ApplicationError(err.message, 404))
    if (err instanceof ProductCodeDuplicatedException) return next(new ApplicationError(err.message, 409))
    if (err instanceof ProductValidationError) return next(new ApplicationError(err.message, 400))

    throw err
  }
}

export default ProductsInterceptor
