const { Router } = require('express')
const ProductsController = require('../controllers/ProductsController.js')
const asyncHandler = require('express-async-handler')
const ProductInterceptor = require('./interceptors/ProductInterceptor.js')
const { upload } = require('../config/multer.js')
const productsRouter = Router()

productsRouter.get('/', asyncHandler(ProductsController.getAll))
productsRouter.post('/', upload.single('thumbnail'), asyncHandler(ProductsController.create))
productsRouter.get('/:pid', asyncHandler(ProductsController.getById))
productsRouter.put('/:pid', upload.single('thumbnail'), asyncHandler(ProductsController.updateById))
productsRouter.delete('/:pid', asyncHandler(ProductsController.deleteById))

productsRouter.use(ProductInterceptor.intercept)

module.exports = productsRouter
