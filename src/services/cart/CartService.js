import { CartModel } from '../../daos/models/carts.model.js'
import { ProductModel } from '../../daos/models/products.model.js'
import { ProductNotFoundError } from '../product/errors.js'
import { CartNotFoundException, NoStockProductException, ProductNotFoundInCartException } from './errors.js'

class CartsService {
  async getAll (limit = null) {
    try {
      return await CartModel.find({}).limit(limit).lean()
    } catch {
      return []
    }
  }

  async getById (cid) {
    const cart = await CartModel
      .findOne({ _id: cid }).populate('products.product')
      .orFail(new CartNotFoundException(cid))
    return cart
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
      cart.products.push({
        product: product._id,
        quantity: 1
      })
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

  async updateCart (cid, data) {
    const cart = await CartModel.findOne({ _id: cid }).orFail(new CartNotFoundException(cid))
    cart.products = []
    // TODO: [{ prodId: 1, quantity: 2 },{ prodId: 2, quantity: 2 }]
    // data is an array of objects with id and quantity and needs to be mapped by id=>product and quantity=>quantity
    data.forEach(async item => {
      const product = await ProductModel.findOne({ _id: item.prodId }).orFail(new ProductNotFoundError(item.prodId))
      cart.products.push({ product: product._id, quantity: item.quantity })
    })
    return await cart.save()
  }

  async deleteProducts (cid) {
    const cart = await CartModel.findOne({ _id: cid }).orFail(new CartNotFoundException(cid))
    cart.products = []
    return await cart.save()
  }
}

export default new CartsService()
