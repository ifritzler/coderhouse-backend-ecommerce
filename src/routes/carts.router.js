const { Router } = require('express')
const CartsController = require('../controllers/CartsController.js')
const asyncHandler = require('express-async-handler')
const CartsInterceptor = require('./interceptors/CartsInterceptor.js')

const cartsRouter = Router()

cartsRouter.get('/:cid', asyncHandler(CartsController.getCartProducts))
cartsRouter.post('/', asyncHandler(CartsController.create))
cartsRouter.post('/:cid/product/:pid', asyncHandler(CartsController.addProductTo))
cartsRouter.delete('/:cid/product/:pid', asyncHandler(CartsController.deleteCartProduct))

cartsRouter.use(CartsInterceptor.intercept)

module.exports = CartsInterceptor
