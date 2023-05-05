const { Router } = require('express')
const ProductsController = require('../controllers/ProductsController.js')
const asyncHandler = require('express-async-handler')
const ProductInterceptor = require('./interceptors/ProductInterceptor.js')

const productsRouter = Router()

productsRouter.get('/', asyncHandler(ProductsController.getAll))
productsRouter.post('/', asyncHandler(ProductsController.create))
productsRouter.get('/:pid', asyncHandler(ProductsController.getById))
productsRouter.put('/:pid', asyncHandler(ProductsController.updateById))
productsRouter.delete('/:pid', asyncHandler(ProductsController.deleteById))

productsRouter.use(ProductInterceptor.intercept)

module.exports = productsRouter
