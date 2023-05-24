const { Router } = require('express')
const productsManager = require('../services/product/ProductMongoManager')
const router = Router()

router.get('/', async (req, res) => {
  const products = await productsManager.getProducts()
  res.render('home', { products })
})

router.get('/realtimeProducts', async (req, res) => {
  const products = await productsManager.getProducts()
  res.render('realtimeProducts', { products })
})

module.exports = router
