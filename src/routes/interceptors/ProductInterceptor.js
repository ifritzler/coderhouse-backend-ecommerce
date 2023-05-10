import ApplicationError from '../../exceptions/ApplicationError.js'
import { ProductNotFoundException, ProductCodeDuplicatedException, ProductValidationError } from '../../exceptions/product.exceptions.js'

class ProductInterceptor {
  static intercept(err, _req, _res, next) {
    if (err instanceof ProductNotFoundException) return next(new ApplicationError(err.message, 404))
    if (err instanceof ProductCodeDuplicatedException) return next(new ApplicationError(err.message, 409))
    if (err instanceof ProductValidationError) return next(new ApplicationError(err.message, 400))

    throw err
  }
}

export default ProductInterceptor
