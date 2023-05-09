import { Router } from 'express'
import ProductsController from '../controllers/ProductsController.js'
import asyncHandler from 'express-async-handler'
import ProductInterceptor from './interceptors/ProductInterceptor.js'
import { upload } from '../config/multer.js'

const productsRouter = Router()

productsRouter.get('/', asyncHandler(ProductsController.getAll))

productsRouter.post(
  '/', 
  asyncHandler(upload.single('thumbnail')), 
  asyncHandler(ProductsController.create)
)

productsRouter.get('/:pid', asyncHandler(ProductsController.getById))

productsRouter.put(
  '/:pid', 
  asyncHandler(upload.single('thumbnail')), 
  asyncHandler(ProductsController.updateById)
)
productsRouter.delete('/:pid', asyncHandler(ProductsController.deleteById))

productsRouter.use(ProductInterceptor.intercept)

export default productsRouter
