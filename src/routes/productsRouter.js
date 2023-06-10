/* eslint-disable no-unexpected-multiline */
import express from 'express'
import { productCreateValidation, productUpdateValidation } from '../middlewares/validations/productValidation.js'
import productInterceptor from '../middlewares/errors/productsInterceptor.js'
import asyncHandler from 'express-async-handler'
import upload from '../middlewares/multer.js'
import productService from '../services/product/ProductService.js'

const router = express.Router()

router.get('/', asyncHandler(async (req, res) => {
  let { limit = 3, page = 1, query, sort } = req.query
  if (sort && (sort !== 'asc' && sort !== 'desc')) {
    sort = ''
  }
  const payload = await productService.getProducts({ limit, page, query, sort })
  res.status(200).json({
    success: true,
    ...payload
  })
}))

router.get('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params
  const product = await productService.getProductById(id)
  res.status(200).json({
    success: true,
    payload: product
  })
}))

/* GET users listing. */
router.post('/', asyncHandler(upload.array('thumbnails')), asyncHandler(productCreateValidation), asyncHandler(async (req, res) => {
  const newProduct = await productService.addProduct(req.body)
  // Envio evento realtime a todos los sockets conectados. Si el producto fue agregado por alguien conectado en realtime se le enviara al resto
  // de lo contrario se le enviara a todo el mundo.
  req.clientSocket?.broadcast.emit('product:created', newProduct) ??
    req.ioServer.emit('product:created', newProduct)
  res.status(201).json({
    success: true,
    payload: newProduct
  })
}))

/* GET users listing. */
router.delete('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params
  await productService.deleteProduct(id)
  // Envio evento realtime a todos los sockets conectados. Si el producto fue eliminado por alguien conectado en realtime se le enviara al resto
  // de lo contrario se le enviara a todo el mundo.
  req.clientSocket?.broadcast.emit('product:deleted', id) ??
    req.ioServer.emit('product:deleted', id)
  res.status(200).json({
    success: true
  })
}))

router.put('/:id', asyncHandler(productUpdateValidation), asyncHandler(async (req, res) => {
  const { id } = req.params
  const productUpdated = await productService.updateProduct(id, req.body)
  res.status(200).json({
    success: true,
    payload: productUpdated
  })
}))

router.use(productInterceptor)

export default router
