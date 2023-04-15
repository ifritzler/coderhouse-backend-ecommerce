const { Router } = require('express');
const productsRouter = require('./products.router.js');
const cartsRouter = require('./carts.router.js');
const apiRouter = Router();

apiRouter.use('/products', productsRouter);
apiRouter.use('/carts', cartsRouter);

module.exports = apiRouter;
