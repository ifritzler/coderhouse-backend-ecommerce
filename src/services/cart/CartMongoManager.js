
const { CartNotFoundException, NoStockProductException, ProductNotFoundInCartException } = require('./errors')
const CartModel = require('./cartModel')
const ProductModel = require('../product/productModel')
const { ProductNotFoundError } = require('../product/errors')

class CartMongoManager {
  constructor () {
    this.model = CartModel
  }

  async getAll (limit = null) {
    return await this.model.find({}).limit(limit)
  }

  async getById (cid) {
    const cart = await this.model.findOne({ _id: cid }).populate('products.id')
    if (!cart) {
      throw new CartNotFoundException(cid)
    }
    return cart.populate('products')
  }

  async create () {
    const cart = await this.model.create({ products: [] })
    return cart.id
  }

  async addProductToCart (cid, prodId, quantity = 1) {
    const cart = await this.model.findOne({ _id: cid }).orFail(new CartNotFoundException(cid))
    const productFound = await ProductModel.findOne({ _id: prodId }).orFail(new ProductNotFoundError(prodId)).lean()
    const productIndex = cart.products.findIndex(
      (product) => {
        return product.id.toString() === prodId.toString()
      }
    )
    if (productIndex !== -1) {
      if (cart.products[productIndex].quantity + quantity <= productFound.stock) {
        cart.products[productIndex].quantity += quantity
      } else {
        throw new NoStockProductException(prodId)
      }
    } else {
      // Agregar el producto al carrito con la cantidad si hay stock suficiente
      if (quantity <= productFound.stock) {
        cart.products.push({ id: prodId, quantity })
      } else {
        throw new NoStockProductException()
      }
    }
    await cart.save()
  }

  async removeProductInCart (cid, pid) {
    const cart = await this.model.findOne({ _id: cid }).orFail(new CartNotFoundException(cid))
    const productIndex = cart.products.findIndex((product) => product.id.toString() === pid.toString())
    if (productIndex === -1) {
      throw new ProductNotFoundInCartException(pid)
    }
    cart.products.splice(productIndex, 1)
    await cart.save()
  }
}

module.exports = new CartMongoManager()
