const { ProductNotFoundError, ProductCodeDuplicatedError } = require('./errors')
const { deleteThumbnails } = require('../../utils')
const ProductModel = require('../../daos/models/products.model')
const { sanitizeFilter } = require('mongoose')

class ProductService {
  async getProducts (params) {
    const { limit, page, query, sort } = params
    const queryMongo = {}
    const pagination = {
      page, limit, customLabels: { docs: 'payload' }
    }
    if (query) {
      queryMongo.$text = { $search: query }
    }
    if (sort) {
      pagination.sort = {
        price: sort
      }
    }

    try {
      // use paginate in ProductModel with query to find for categories or title or description, the query is a string
      const result = await ProductModel.paginate(queryMongo, pagination)
      const paramsPrev = new URLSearchParams(`limit=${limit}&page=${result.prevPage}&sort=${sort}&query=${query}`)
      const paramsNext = new URLSearchParams(`limit=${limit}&page=${result.nextPage}&sort=${sort}&query=${query}`)

      result.prevLink = result.prevPage ? `/api/products?${paramsPrev.toString()}` : null
      result.nextLink = result.nextPage ? `/api/products?${paramsNext.toString()}` : null
      return result
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
    return await ProductModel.create(data)
  }

  async updateProduct (id, changes) {
    const product = await ProductModel.findOne(sanitizeFilter({ _id: id })).orFail(new ProductNotFoundError(id))

    const updated = product.updateOne({ $set: changes }, { new: true })
    return updated
  }
}

module.exports = new ProductService()
