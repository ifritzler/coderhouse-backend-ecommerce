const { Router } = require('express');
const productsRouter = require('./productsRouter.js');

const apiRouter = Router();

apiRouter.use('/products', productsRouter)

module.exports = apiRouter;
