const { Router } = require('express')
const productsManager = require('../services/product/ProductService')
const router = Router()

router.get('/', async (req, res) => {
  const products = await productsManager.getProducts({ limit: 4, page: 1 })
  res.render('realtimeProducts', { products })
})

router.get('/realtimeProducts', async (req, res) => {
  const products = await productsManager.getProducts({ limit: 4, page: 1 })
  res.render('home', { products })
})

module.exports = router
