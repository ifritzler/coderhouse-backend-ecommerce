const { v4: uuid } = require('uuid')
const fs = require('fs')
const { ProductNotFoundError, ProductCodeDuplicatedError } = require('./errors')
const { deleteThumbnails } = require('../../utils')

class ProductManager {
  constructor (path) {
    this.path = path
  }

  async getProducts () {
    try {
      const file = await fs.promises.readFile(this.path, 'utf8')
      return JSON.parse(file)
    } catch {
      return []
    }
  }

  async getProductById (id) {
    const products = await this.getProducts()
    const product = products.find(product => product.id === id)
    if (!product) {
      throw new ProductNotFoundError(id)
    }
    return product
  }

  async deleteProduct (id) {
    const products = await this.getProducts()
    const index = products.findIndex(product => product.id === id)
    if (index === -1) {
      throw new ProductNotFoundError(id)
    }
    const deleted = products.splice(index, 1)
    console.log(deleted)
    await deleteThumbnails(deleted[0].thumbnails)
    await fs.promises.writeFile(this.path, JSON.stringify(products))
  }

  async addProduct (data) {
    const products = await this.getProducts()
    const isCodeExists = products.some(product => product.code === data.code)
    if (isCodeExists) {
      throw new ProductCodeDuplicatedError(data.code)
    }
    const newProduct = {
      id: uuid(),
      ...data
    }
    products.push(newProduct)
    await fs.promises.writeFile(this.path, JSON.stringify(products))
    return newProduct
  }

  async updateProduct (id, changes) {
    const products = await this.getProducts()
    const index = products.findIndex(product => product.id === id)
    if (index === -1) {
      throw new ProductNotFoundError(id)
    }
    products[index] = { ...products[index], ...changes }
    await fs.promises.writeFile(this.path, JSON.stringify(products))
  }
}

module.exports = new ProductManager('src/products.json')
