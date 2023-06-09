const express = require('express')
const asyncHandler = require('express-async-handler')
const cartManager = require('../services/cart/CartManager')
const productManager = require('../services/product/ProductManager')
const { ProductNotFoundError } = require('../services/product/errors')
const { ProductNotFoundInCartException } = require('../services/cart/errors.js')
const cartInterceptor = require('../middlewares/errors/cartsInterceptor')
const cartsRouter = express.Router()

cartsRouter.get('/:cid', asyncHandler(async (req, res) => {
  const { cid } = req.params
  const cart = await cartManager.getById(cid)
  res.status(200).json({
    success: true,
    payload: cart.products
  })
}))

cartsRouter.post('/', asyncHandler(async (_req, res) => {
  const cart = await cartManager.create()
  res.status(201).json({
    success: true,
    payload: cart
  })
}))

cartsRouter.post('/:cid/product/:pid', asyncHandler(async (req, res) => {
  try {
    const { cid, pid } = req.params
    // This line of code just makes the product search and throws error if not exists.
    const product = await productManager.getProductById(pid)

    await cartManager.addProductToCart(cid, product)
    res.status(200).json({
      success: true
    })
  } catch (error) {
    if (error instanceof ProductNotFoundError) {
      throw new ProductNotFoundInCartException(req.params.cid, req.params.pid)
    }
    throw error
  }
}))
cartsRouter.delete('/:cid/product/:pid', asyncHandler(async (req, res) => {
  const { cid, pid } = req.params
  await cartManager.removeProductInCart(cid, pid)
  res.status(200).json({
    success: true
  })
}))

cartsRouter.use(cartInterceptor)

module.exports = cartsRouter
