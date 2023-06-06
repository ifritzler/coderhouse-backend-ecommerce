const { CartNotFoundException, NoStockProductException, ProductNotFoundInCartException } = require('./errors')
const CartModel = require('../../daos/models/carts.model')
const ProductModel = require('../../daos/models/products.model')
const { ProductNotFoundError } = require('../product/errors')

class CartsService {
  async getAll (limit = null) {
    try {
      return await CartModel.find({}).limit(limit).lean()
    } catch {
      return []
    }
  }

  async getById (cid) {
    const product = CartModel
      .findOne({ _id: cid }).populate('products.product')
      .orFail(new CartNotFoundException(cid))
    return product
  }

  async create () {
    return await CartModel.create({})
  }

  async addProductToCart (cid, pid) {
    const product = await ProductModel.findOne({ _id: pid }).lean()
      .orFail(new ProductNotFoundError(pid))

    const cart = await CartModel.findOne({ _id: cid }).orFail(new CartNotFoundException(cid))

    const productIndex = cart.products.findIndex(item => item.product._id.toString() === pid)

    if (productIndex === -1) {
      if (product.stock === 0) throw new NoStockProductException(pid)
      cart.products.push({ product: product._id })
      return await cart.save()
    }

    if (product.stock < cart.products[productIndex].quantity + 1) throw new NoStockProductException(pid)
    cart.products[productIndex].quantity += 1
    return await cart.save()
  }

  async removeProductInCart (cid, pid) {
    const cart = await CartModel.findOne({ _id: cid }).orFail(new CartNotFoundException(cid))

    const productIndex = cart.products.findIndex(item => item.product._id.toString() === pid)
    if (productIndex === -1) throw new ProductNotFoundInCartException(pid)
    cart.products.splice(productIndex, 1)
    return await cart.save()
  }

  async delete (cid) {
    await CartModel.deleteOne({ _id: cid }).orFail(new CartNotFoundException(cid))
  }
}

module.exports = new CartsService('src/carts.json')
