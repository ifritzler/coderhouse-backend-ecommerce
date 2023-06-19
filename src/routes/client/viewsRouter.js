import { Router } from 'express'
import productsManager from '../../services/product/ProductService.js'
import cartsManager from '../../services/cart/CartService.js'
import cartInterceptor from '../../middlewares/errors/cartsInterceptor.js'
import { isLoguedIn } from '../../middlewares/clientRoutesSession.js'

const router = Router()

router.get('/login', async (req, res) => {
  if (req.session.user) {
    return res.redirect('/')
  }
  res.render('login')
})

router.get('/register', async (req, res) => {
  if (req.session.user) {
    return res.redirect('/')
  }
  res.render('register')
})

router.get('/', isLoguedIn, async (req, res) => {
  res.render('home', { user: req.session.user })
})

router.get('/store', isLoguedIn, async (req, res) => {
  let { limit = 3, page = 1, query, sort } = req.query
  if (sort && (sort !== 'asc' && sort !== 'desc')) {
    sort = ''
  }
  const payload = await productsManager.getProducts({ limit, page, query, sort })
  const categories = await productsManager.getCategories()

  res.render('store', { products: { ...payload }, categories, user: req.session.user })
})

router.get('/product/:id', isLoguedIn, async (req, res) => {
  try {
    const product = await productsManager.getProductById(req.params.id)
    res.render('product', { product, user: req.session.user })
  } catch (error) {
    res.render('404')
  }
})

router.get('/cart/:id', isLoguedIn, async (req, res) => {
  const { id } = req.params
  const cart = await cartsManager.getById(id)
  res.render('cart', { cart: JSON.parse(JSON.stringify(cart.products)), user: req.session.user })
})

router.use(cartInterceptor)

export default router
