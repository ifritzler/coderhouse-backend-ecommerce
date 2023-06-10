import createError from 'http-errors'
import { ProductNotFoundError, ProductCodeDuplicatedError, ProductValidationError } from '../../services/product/errors.js'

const productInterceptor = (error, req, res, next) => {
  if (error instanceof ProductNotFoundError) return next(createError(404, error.message))
  if (error instanceof ProductCodeDuplicatedError) return next(createError(409, error.message))
  if (error instanceof ProductValidationError) return next(createError(400, error.message))
  throw error
}
export default productInterceptor
