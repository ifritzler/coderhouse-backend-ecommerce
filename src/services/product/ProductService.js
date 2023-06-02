const { ProductNotFoundError, ProductCodeDuplicatedError } = require('./errors')
const { deleteThumbnails } = require('../../utils')
const ProductModel = require('../../daos/models/products.model')
const { sanitizeFilter } = require('mongoose')

class ProductManager {
  constructor () {
    this.dao = ProductModel
  }

  async getProducts (limit) {
    try {
      return await this.dao.find({}).limit(limit).lean()
    } catch {
      return []
    }
  }

  async getProductById (id) {
    const product = this.dao
      .findOne({ _id: id }).lean()
      .orFail(new ProductNotFoundError(id))
    return product
  }

  async deleteProduct (id) {
    const product = await this.dao
      .findOne(sanitizeFilter({ _id: id }), { thumbnails: 1 })
      .orFail(new ProductNotFoundError(id))

    await this.dao.deleteOne({ _id: id })
    await deleteThumbnails(product.thumbnails)
  }

  async addProduct (data) {
    const isCodeExists = await this.dao.findOne(sanitizeFilter({ code: data.code }))
    if (isCodeExists) {
      await deleteThumbnails(data.thumbnails)
      throw new ProductCodeDuplicatedError(data.code)
    }
    const newProduct = {
      ...data
    }
    return await this.dao.create(newProduct)
  }

  async updateProduct (id, changes) {
    const product = await this.dao.findOne(sanitizeFilter({ _id: id })).orFail(new ProductNotFoundError(id))

    const updated = product.updateOne({ $set: changes }, { new: true })
    return updated
  }
}

module.exports = new ProductManager()
