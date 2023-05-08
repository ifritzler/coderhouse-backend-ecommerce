const { upload } = require('../config/multer.js')
const productService = require('../services/ProductsService.js')
const { removeUploadImages } = require('../utils.js')

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

  static async create (req, res, next) {
    // El middleware de upload lo utilizo de esta manera porque:
    // me permite manejar el caso donde tanto el file como la data de producto de error
    // para de esa manera eliminar el archivo cargado por multer sin que quede en el servidor

    upload.single('thumbnail')(req, res, async err => {
      if (err) {
        // Si hay error de carga de multer lanzo el error
        return next(err)
      }
      try {
        // Intentamos cargar el producto nuevo
        const data = req.body
        data.thumbnails = ['/thumbnails/' + req.file.filename]
        const product = await productService.addProduct(data)
        res.status(201).json({
          success: true,
          payload: product
        })
      } catch (error) {
        // En caso de error en la carga del producto procedemos a eliminar los archivos que hayan
        // podido cargarse antes de lanzar el error al errorHandler
        await removeUploadImages(null, req)
        next(error)
      }
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

module.exports = ProductsController
