import { Router } from 'express'
import CartsController from '../controllers/CartsController.js'
import asyncHandler from 'express-async-handler'
import CartsInterceptor from './interceptors/CartsInterceptor.js'

const cartsRouter = Router()

cartsRouter.get('/:cid', asyncHandler(CartsController.getCartProducts))
cartsRouter.post('/', asyncHandler(CartsController.create))
cartsRouter.post('/:cid/product/:pid', asyncHandler(CartsController.addProductToCart))
cartsRouter.delete('/:cid/product/:pid', asyncHandler(CartsController.deleteCartProduct))

cartsRouter.use(CartsInterceptor.intercept)

export default cartsRouter
