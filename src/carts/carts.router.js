const { Router } = require('express')
const CartsController = require('./carts.controller')
const asyncHandler = require('express-async-handler')
const CartsInterceptor = require('./carts.interceptor')

const cartsRouter = Router()

// Obtener los productos del carrito por id
cartsRouter.get('/:cid', asyncHandler(CartsController.getCartProducts))
// Crear un carrito
cartsRouter.post('/', asyncHandler(CartsController.create))
cartsRouter.post('/:cid/product/:pid', asyncHandler(CartsController.addProductTo))
cartsRouter.delete('/:cid/product/:pid', asyncHandler(CartsController.deleteCartProduct))

cartsRouter.use(CartsInterceptor.intercept)

module.exports = cartsRouter
