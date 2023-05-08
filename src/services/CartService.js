import { existsSync, promises } from 'fs'
import { CartNotFoundException, ProductNotFoundInCartException } from '../exceptions/cart.exceptions.js'
import { v4 as uuid } from 'uuid'

class CartsService {
  constructor (path) {
    this.path = path
  }

  async getAll (limit = null) {
    const carts = existsSync(this.path)
      ? JSON.parse(await promises.readFile(this.path, { encoding: 'utf-8' }))
      : []
    return limit ? carts.slice(0, limit) : carts
  }

  async getById (cid) {
    const carts = await this.getAll()
    const found = carts.find(cart => cart.id === cid)
    if (!found) {
      throw new CartNotFoundException(cid)
    }
    return found
  }

  async create () {
    const carts = await this.getAll()
    const newCart = {
      id: uuid(),
      products: []
    }
    carts.push(newCart)
    promises.writeFile(this.path, JSON.stringify(carts, null, 2))
    return newCart
  }

  async addProductToCart (cid, pid) {
    const carts = await this.getAll()
    const cartIndex = carts.findIndex(cart => cart.id === cid)
    if (cartIndex === -1) throw new CartNotFoundException(cid)

    const productCartIndex = carts[cartIndex].products.findIndex(product => product.id === pid)
    if (productCartIndex === -1) {
      carts[cartIndex].products.push({
        id: pid, quantity: 1
      })
    } else {
      carts[cartIndex].products[productCartIndex].quantity += 1
    }
    await promises.writeFile(this.path, JSON.stringify(carts, null, 2))
  }

  async deleteProductInCart (cid, pid) {
    const carts = await this.getAll()
    const cartIndex = carts.findIndex(cart => cart.id === cid)
    if (cartIndex === -1) {
      throw new CartNotFoundException(cid)
    }
    // I'm use findIndex and splice instead of filter because the id's are not duplicated
    // and with filter I go through the whole array. Is more permormant.
    const productCartIndex = carts[cartIndex].products.findIndex(product => product === pid)
    if (!productCartIndex) {
      throw new ProductNotFoundInCartException(cid, pid)
    }
    carts[cartIndex].products.splice(productCartIndex, 1)
    await promises.writeFile(this.path, JSON.stringify(carts, null, 2))
  }
}

export default new CartsService('./src/database/carts.json')
