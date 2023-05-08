const { Router } = require('express')
const productsRouter = require('./products.router.js')
const cartsRouter = require('./carts.router.js')
const MulterInterceptor = require('./interceptors/MulterInterceptor.js')
const apiRouter = Router()

apiRouter.use('/products', productsRouter)
apiRouter.use('/carts', cartsRouter)

apiRouter.use(MulterInterceptor.intercept)

module.exports = apiRouter
