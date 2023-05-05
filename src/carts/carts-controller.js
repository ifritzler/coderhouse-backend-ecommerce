import { cartsService } from './carts-service.js'

export class CartsController {
  static async getCartProducts (req, res) {
    const { cid } = req.params
    const cart = cartsService.getById(parseInt(cid))
    res.status(200).json(cart.product)
  }

  static async create (req, res) {
    const cart = await cartsService.create()
    res.status(201).json(cart)
  }

  static async addProductTo (req, res) {
    const { cid, pid } = req.params
    await cartsService.addProductToCart(parseInt(cid), parseInt(pid))
    res.status(200).send()
  }

  static async deleteCartProduct (req, res) {
    const { cid, pid } = req.params
    await cartsService.deleteProductInCart(parseInt(cid), parseInt(pid))
    res.status(204).send()
  }
}
