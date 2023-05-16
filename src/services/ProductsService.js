import { promises, existsSync } from 'fs'
import { cleanUndefinedProperties } from '../utils.js'
import { ProductValidationError, ProductCodeDuplicatedException, ProductNotFoundException } from '../exceptions/product.exceptions.js'
import { v4 as uuid } from 'uuid'

class ProductService {
  constructor (path) {
    this.path = path
  }

  async addProduct (productInputData = {}) {
    const { title, description, price, thumbnails = [], code, stock, status = true, category } = productInputData
    if (!title || !description || !price || !code || !stock || !category) {
      throw new ProductValidationError()
    }
    const products = await this.getProducts()
    if (products.find(product => product.code === code)) {
      throw new ProductCodeDuplicatedException(code)
    }
    const id = uuid()
    const newProduct = {
      id, title, description, price: +price, thumbnails, code, stock: +stock, status, category
    }
    products.push(newProduct)
    await promises.writeFile(this.path, JSON.stringify(products, null, 2))
    return newProduct
  }

  async getProducts (limit = null) {
    const products = existsSync(this.path)
      ? JSON.parse(await promises.readFile(this.path, { encoding: 'utf-8' }))
      : []
    return limit ? products.slice(0, limit) : products
  }

  async getProductById (pid) {
    const products = await this.getProducts()
    const found = products.find(product => product.id === pid)
    if (!found) {
      throw new ProductNotFoundException(pid)
    }
    return found
  }

  async updateProduct (pid, data = {}) {
    const unCleanedChanges = {
      title: data.title,
      description: data.description,
      price: data.price,
      code: data.code,
      stock: data.stock,
      status: data.status,
      category: data.category,
      thumbnails: data.thumbnails
    }
    const productChanges = cleanUndefinedProperties(unCleanedChanges)

    const products = await this.getProducts()
    const productIndex = products.findIndex(p => p.id === pid)
    if (productIndex === -1) {
      throw new ProductNotFoundException(pid)
    }
    const codeExists = products.some(p => p.code === productChanges.code)
    if (codeExists) {
      throw new ProductCodeDuplicatedException(productChanges.code)
    }
    const product = { ...products[productIndex] }
    const productUpdated = { ...product, ...productChanges }
    const newProducts = products.map((p, index) => index === productIndex ? productUpdated : p)
    await promises.writeFile(this.path, JSON.stringify(newProducts, null, 2))
    return productUpdated
  }

  async deleteProduct (pid) {
    const products = await this.getProducts()
    if (!products.find(product => product.id === pid)) throw new ProductNotFoundException(pid)
    const newProducts = products.filter(product => product.id !== pid)
    await promises.writeFile(this.path, JSON.stringify(newProducts, null, 2))
  }
}

export default new ProductService('./src/database/products.json')
