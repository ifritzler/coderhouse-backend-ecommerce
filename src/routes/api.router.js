import { Router } from 'express'
import productsRouter from './products.router.js'
import cartsRouter from './carts.router.js'
import MulterInterceptor from './interceptors/MulterInterceptor.js'
const apiRouter = Router()

apiRouter.use('/products', productsRouter)
apiRouter.use('/carts', cartsRouter)

apiRouter.use(MulterInterceptor.intercept)

export default apiRouter
