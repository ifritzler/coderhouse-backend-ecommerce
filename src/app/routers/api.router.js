const {Router} = require('express');
const productsRouter = require('../../products/products.router');
const cartsRouter = require('../../carts/carts.router');

const apiRouter = Router();

apiRouter.use('/products', productsRouter);
apiRouter.use('/carts', cartsRouter);

module.exports = apiRouter;
