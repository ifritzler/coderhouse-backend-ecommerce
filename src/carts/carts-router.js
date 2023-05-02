import { Router } from 'express'
import { CartsController } from './carts-controller.js'
import asyncHandler from 'express-async-handler'
import { CartsInterceptor } from './carts-interceptor.js'

export const cartsRouter = Router()

// Obtener los productos del carrito por id
cartsRouter.get('/:cid', asyncHandler(CartsController.getCartProducts))
// Crear un carrito
cartsRouter.post('/', asyncHandler(CartsController.create))
cartsRouter.post('/:cid/product/:pid', asyncHandler(CartsController.addProductTo))
cartsRouter.delete('/:cid/product/:pid', asyncHandler(CartsController.deleteCartProduct))

cartsRouter.use(CartsInterceptor.intercept)
