const { ProductNotFoundError, ProductCodeDuplicatedError } = require('./errors')
const { deleteThumbnails } = require('../../utils')
const ProductModel = require('../../daos/models/products.model')
const { sanitizeFilter } = require('mongoose')

class ProductManager {
  async getProducts (limit) {
    try {
      return await ProductModel.find({}).limit(limit).lean()
    } catch {
      return []
    }
  }

  async getProductById (id) {
    const product = ProductModel
      .findOne({ _id: id }).lean()
      .orFail(new ProductNotFoundError(id))
    return product
  }

  async deleteProduct (id) {
    const product = await ProductModel
      .findOne(sanitizeFilter({ _id: id }), { thumbnails: 1 })
      .orFail(new ProductNotFoundError(id))

    await ProductModel.deleteOne({ _id: id })
    await deleteThumbnails(product.thumbnails)
  }

  async addProduct (data) {
    const isCodeExists = await ProductModel.findOne(sanitizeFilter({ code: data.code }))
    if (isCodeExists) {
      await deleteThumbnails(data.thumbnails)
      throw new ProductCodeDuplicatedError(data.code)
    }
    const newProduct = {
      ...data
    }
    return await ProductModel.create(newProduct)
  }

  async updateProduct (id, changes) {
    const product = await ProductModel.findOne(sanitizeFilter({ _id: id })).orFail(new ProductNotFoundError(id))

    const updated = product.updateOne({ $set: changes }, { new: true })
    return updated
  }
}

module.exports = new ProductManager()
