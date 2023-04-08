const { Router } = require('express');
const ProductsController = require('../controllers/ProductsController.js');
const asyncHandler = require('express-async-handler');
const ProductInterceptor = require('../middlewares/interceptors/ProductInterceptor.js');

const productsRouter = Router();

productsRouter.get('/', asyncHandler(ProductsController.getAll));
productsRouter.get('/:pid', asyncHandler(ProductsController.getById));

productsRouter.use(ProductInterceptor.intercept);

module.exports = productsRouter;
