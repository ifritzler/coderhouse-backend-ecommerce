const { ProductNotFoundInCartException } = require('../exceptions/cart.exceptions.js')
const { ProductNotFoundException } = require('../exceptions/product.exceptions.js')
const cartsService = require('../services/CartService.js')
const productsService = require('../services/ProductsService.js')

class CartsController {
  static async getCartProducts (req, res) {
    const { cid } = req.params
    const cart = await cartsService.getById(cid)
    res.status(200).json({
      success: true,
      payload: cart.products
    })
  }

  static async create (req, res) {
    const cart = await cartsService.create()
    res.status(201).json({
      success: true,
      payload: cart
    })
  }

  static async addProductToCart (req, res) {
    try {
      const { cid, pid } = req.params
      // This line of code just makes the product search and throws error if not exists.
      const product = await productsService.getProductById(pid)

      await cartsService.addProductToCart(cid, product.id)
      res.status(200).json({
        success: true
      })
    } catch (error) {
      if (error instanceof ProductNotFoundException) {
        throw new ProductNotFoundInCartException(req.params.cid, req.params.pid)
      }
      throw error
    }
  }

  static async deleteCartProduct (req, res) {
    const { cid, pid } = req.params
    await cartsService.deleteProductInCart(cid, pid)
    res.status(200).json({
      success: true
    })
  }
}

module.exports = CartsController
