import { Router } from 'express'
import productsManager from '../services/product/ProductService.js'
import cartsManager from '../services/cart/CartService.js'

const router = Router()

router.get('/', async (req, res) => {
  let { limit = 3, page = 1, query, sort } = req.query
  if (sort && (sort !== 'asc' && sort !== 'desc')) {
    sort = ''
  }
  const payload = await productsManager.getProducts({ limit, page, query, sort })
  res.render('home', { products: { ...payload } })
})

router.get('/cart/:id', async (req, res) => {
  const { id } = req.params
  const cart = await cartsManager.getById(id)
  console.log(JSON.parse(JSON.stringify(cart.products)))
  res.render('cart', { cart: JSON.parse(JSON.stringify(cart.products)) })
})

router.get('/product/:id', async (req, res) => {
  try {
    const product = await productsManager.getProductById(req.params.id)
    res.render('product', { product })
  } catch (error) {
    res.render('404')
  }
})

export default router
