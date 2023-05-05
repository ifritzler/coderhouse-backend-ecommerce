import { Router } from 'express'
import { productService } from '../products/products-service.js'

export const clientRouter = Router()

clientRouter.get('/', async (req, res) => {
  const products = await productService.getProducts()
  res.render('index', { products })
})

clientRouter.get('/realtimeProducts', async (req, res) => {
  const products = await productService.getProducts()
  res.render('index', { products, socket: true })
})
