import { upload } from '../config/multer.js'
import productService from '../services/ProductsService.js'
import { removeUploadImages } from '../utils.js'

class ProductsController {
  constructor () {
    this.productService = productService
  };

  static async getAll (req, res) {
    const limit = parseInt(req.query.limit || 20)
    if (isNaN(limit)) {
      return res.status(400).json({
        error: "The query param 'limit' must be a valid number"
      })
    }
    const products = await productService.getProducts(limit)
    res.status(200).json({
      success: true,
      payload: products
    })
  }

  static async getById (req, res) {
    const { pid } = req.params
    const product = await productService.getProductById(pid)
    res.status(200).json({
      success: true,
      payload: product
    })
  }

  static async create (req, res) {
    const data = req.body
    data.thumbnails = ['/thumbnails/' + req.file.filename]
    const product = await productService.addProduct(data)
    res.status(201).json({
      success: true,
      payload: product
    })
  }

  static async updateById (req, res) {
    const { pid } = req.params
    const data = req.body
    const updatedProduct = await productService.updateProduct(pid, data)
    res.status(200).json({
      success: true,
      payload: updatedProduct
    })
    //
  }

  static async deleteById (req, res) {
    const { pid } = req.params
    await productService.deleteProduct(pid)
    res.status(200).json({
      success: true
    })
  }
}

export default ProductsController
