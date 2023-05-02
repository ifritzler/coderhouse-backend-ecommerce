import { Router } from 'express'
import ProductsController from './carts.controller.js'
import asyncHandler from 'express-async-handler'
import CartsInterceptor from './carts.interceptor.js'

const cartsRouter = Router()

// Obtener los productos del carrito por id
cartsRouter.get('/:cid', asyncHandler(ProductsController.getCartProducts))
// Crear un carrito
cartsRouter.post('/', asyncHandler(ProductsController.create))
cartsRouter.post('/:cid/product/:pid', asyncHandler(ProductsController.addProductTo))
cartsRouter.delete('/:cid/product/:pid', asyncHandler(ProductsController.deleteCartProduct))

cartsRouter.use(CartsInterceptor.intercept)

export default cartsRouter
