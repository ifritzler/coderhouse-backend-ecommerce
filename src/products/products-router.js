import asyncHandler from 'express-async-handler'
import { Router } from 'express'
import { ProductsController } from './products-controller.js'
import { ProductsInterceptor } from './products-interceptor.js'

export const productsRouter = Router()

productsRouter.get('/', asyncHandler(ProductsController.getAll))
productsRouter.post('/', asyncHandler(ProductsController.create))
productsRouter.get('/:pid', asyncHandler(ProductsController.getById))
productsRouter.put('/:pid', asyncHandler(ProductsController.updateById))
productsRouter.delete('/:pid', asyncHandler(ProductsController.deleteById))

productsRouter.use(ProductsInterceptor.intercept)
