import { promises, existsSync } from 'fs'
import { cleanUndefinedProperties } from '../app/utils.js'
import { EventBus } from '../app/event-bus.js'
import { v4 } from 'uuid'

import { ProductValidationError, ProductNotFoundException, ProductCodeDuplicatedException } from './products-exceptions.js'

export class ProductService {
  constructor (path, eventBus) {
    this.path = path
    this.EventBus = eventBus
  }

  async addProduct (productInputData = {}) {
    const { title, description, price, thumbnail, code, stock } = productInputData
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      throw new ProductValidationError()
    }
    const products = await this.getProducts()
    if (products.find(product => product.code === code)) {
      throw new ProductCodeDuplicatedException(code)
    }
    const id = v4()
    const newProduct = {
      id, title, description, price, thumbnail, code, stock
    }
    products.push(newProduct)
    await promises.writeFile(this.path, JSON.stringify(products, null, 2))

    // Envio el evento a travez de node para que lo escuchen las partes interesadas, en este caso
    // la configuracion de sockets para darle aviso a todos los que estan conectados en realtime
    this.EventBus.emit('new:product', newProduct)
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
    const { id: _id, ...changes } = data
    const productChanges = cleanUndefinedProperties(changes)

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
    const productIndex = products.findIndex(product => product.id === pid)
    products.splice(productIndex, 1)
    if (productIndex === -1) throw new ProductNotFoundException(pid)
    products.splice(productIndex, 1)
    await promises.writeFile(this.path, JSON.stringify(products, null, 2))
  }
}

export const productService = new ProductService('./src/app/database/products.json', EventBus)
