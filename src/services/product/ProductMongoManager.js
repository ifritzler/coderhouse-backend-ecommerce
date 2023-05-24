const { ProductNotFoundError, ProductCodeDuplicatedError } = require('../../services/product/errors')
const { deleteThumbnails } = require('../../utils')
const ProductModel = require('../../services/product/productModel')
const { sanitizeFilter } = require('mongoose')
class ProductMongoManager {
  constructor () {
    this.model = ProductModel
  }

  async getProducts (limit) {
    try {
      return await this.model.find({}).limit(limit).lean()
    } catch {
      return []
    }
  }

  async getProductById (id) {
    const product = this.model.findOne({ _id: id }).lean().orFail(new ProductNotFoundError(id))
    return product
  }

  async deleteProduct (id) {
    const product = await this.model
      .findOne(sanitizeFilter({ _id: id }), { thumbnails: 1 })
      .orFail(new ProductNotFoundError(id))

    await this.model.deleteOne({ _id: id })
    await deleteThumbnails(product.thumbnails)
  }

  async addProduct (data) {
    const isCodeExists = await this.model.findOne(sanitizeFilter({ code: data.code }))
    if (isCodeExists) {
      await deleteThumbnails(data.thumbnails)
      throw new ProductCodeDuplicatedError(data.code)
    }
    const newProduct = {
      ...data
    }
    return await this.model.create(newProduct)
  }

  async updateProduct (id, changes) {
    const product = await this.model.findOne(sanitizeFilter({ _id: id })).orFail(new ProductNotFoundError(id))

    const updated = product.updateOne({ $set: changes }, { new: true })
    return updated
  }
}

module.exports = new ProductMongoManager()
