import ApplicationError from '../../exceptions/ApplicationError.js'
import { CartNotFoundException, NoStockProductException, ProductNotFoundInCartException } from '../../exceptions/cart.exceptions.js'

class CartsInterceptor {
  static intercept(err, _req, _res, next) {
    if (err instanceof CartNotFoundException) return next(new ApplicationError(err.message, 404))
    if (err instanceof ProductNotFoundInCartException) return next(new ApplicationError(err.message, 404))
    if (err instanceof NoStockProductException) return next(new ApplicationError(err.message, 400))
    throw err
  }
}

export default CartsInterceptor
