import { Router } from 'express'
import productsRouter from '../../products/products.router.js'
import cartsRouter from '../../carts/carts.router.js'

const apiRouter = Router()

apiRouter.use('/products', productsRouter)
apiRouter.use('/carts', cartsRouter)

export default apiRouter
