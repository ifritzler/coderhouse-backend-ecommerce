import express from 'express'
import asyncHandler from 'express-async-handler'
import cartService from '../services/cart/CartService.js'
import { ProductNotFoundError } from '../services/product/errors.js'
import { ProductNotFoundInCartException } from '../services/cart/errors.js'
import cartInterceptor from '../middlewares/errors/cartsInterceptor.js'

const cartsRouter = express.Router()

cartsRouter.get('/:cid', asyncHandler(async (req, res) => {
  const { cid } = req.params
  const cart = await cartService.getById(cid)
  res.status(200).json({
    success: true,
    payload: cart.products
  })
}))

cartsRouter.post('/', asyncHandler(async (_req, res) => {
  const cart = await cartService.create()
  res.status(201).json({
    success: true,
    payload: JSON.parse(JSON.stringify(cart._id))
  })
}))

cartsRouter.post('/:cid/product/:pid', asyncHandler(async (req, res) => {
  try {
    const { cid, pid } = req.params
    // This line of code just makes the product search and throws error if not exists.

    await cartService.addProductToCart(cid, pid)
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

cartsRouter.put('/:cid', asyncHandler(async (req, res) => {
  // This line of code just makes the product search and throws error if not exists.
  try {
    await cartService.updateCart(req.params.cid, req.body)
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
  await cartService.removeProductInCart(cid, pid)
  res.status(200).json({
    success: true
  })
}))

cartsRouter.delete('/:cid', asyncHandler(async (req, res) => {
  await cartService.deleteProducts(req.params.cid)
  res.status(200).json({
    success: true
  })
}))

cartsRouter.use(cartInterceptor)

export default cartsRouter
