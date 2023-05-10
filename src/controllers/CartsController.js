import { ProductNotFoundInCartException } from '../exceptions/cart.exceptions.js'
import { ProductNotFoundException } from '../exceptions/product.exceptions.js'
import cartService from '../services/CartService.js'
import productService from '../services/ProductsService.js'

class CartsController {
  static async getCartProducts(req, res) {
    const { cid } = req.params
    const cart = await cartService.getById(cid)
    res.status(200).json({
      success: true,
      payload: cart.products
    })
  }

  static async create(_req, res) {
    const cart = await cartService.create()
    res.status(201).json({
      success: true,
      payload: cart
    })
  }

  static async addProductToCart(req, res) {
    try {
      const { cid, pid } = req.params
      // This line of code just makes the product search and throws error if not exists.
      const product = await productService.getProductById(pid)

      await cartService.addProductToCart(cid, product)
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

  static async deleteCartProduct(req, res) {
    const { cid, pid } = req.params
    await cartService.removeProductInCart(cid, pid)
    res.status(200).json({
      success: true
    })
  }
}

export default CartsController
