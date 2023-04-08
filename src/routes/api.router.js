const { Router } = require('express');
const productsRouter = require('./products.router.js');

const apiRouter = Router();

apiRouter.use('/products', productsRouter)

module.exports = apiRouter;
