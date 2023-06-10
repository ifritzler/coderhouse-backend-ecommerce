// @ts-nocheck

import { sanitizeFilter } from 'mongoose'
import { ProductModel } from '../../daos/models/products.model.js'
import { ProductCodeDuplicatedError, ProductNotFoundError } from './errors.js'
import { deleteThumbnails } from '../../utils.js'

class ProductService {
  async getProducts (params) {
    const { limit, page, query, sort } = params
    const queryMongo = { status: true }
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
      const result = await ProductModel.paginate(queryMongo, { ...pagination, lean: true })

      const sortParam = sort ? `&sort=${sort}` : ''
      const queryParam = query ? `&query=${query}` : ''

      const paramsPrev = new URLSearchParams(`limit=${limit}&page=${result.prevPage}${sortParam}${queryParam}`)
      const paramsNext = new URLSearchParams(`limit=${limit}&page=${result.nextPage}${sortParam}${queryParam}`)

      result.prevLink = result.prevPage ? `/api/products?${paramsPrev.toString()}` : null
      result.nextLink = result.nextPage ? `/api/products?${paramsNext.toString()}` : null

      return JSON.parse(JSON.stringify(result))
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

export default new ProductService()
