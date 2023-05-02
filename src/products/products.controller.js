import { productService } from './products.service.js'

export class ProductsController {
  constructor () {
    this.productService = productService
  };

  exceptionsexceptions

  /**
     * El servidor debe contar con los siguientes endpoints:
     * ruta GET ‘/products’, la cual debe leer el archivo de productos y devolverlos
     * dentro de un objeto agregar el soporte para recibir por query param
     * el valor ?limit= el cual recibirá un límite de resultados.
     */
  static async getAll (req, res) {
    const limit = parseInt(req.query.limit || 20)
    if (isNaN(limit)) {
      return res.status(400).json({
        error: "The query param 'limit' must be a valid number"
      })
    }
    const products = await productService.getProducts(limit)
    res.status(200).json(products)
  }

  /**
     * ruta GET ‘/products/:pid’, la cual debe recibir por req.params el pid (product Id)
     * y devolver sólo el producto solicitado, en lugar de todos los productos.
     */
  static async getById (req, res) {
    const { pid } = req.params
    const product = await productService.getProductById(pid)
    res.status(200).json(product)
  }

  /**
     * ruta POST ‘/products’, la cual debe recibir por body la informacion del objeto a crear
     * y devolver sólo el producto creado.
     */
  static async create (req, res) {
    const data = req.body
    const product = await productService.addProduct(data)
    res.status(201).json(product)
  }

  /**
     * ruta PUT ‘/products/:id’, la cual debe recibir por param el id del producto a actualizar
     * y por body la informacion que se quiere actualizar.
     * y devolver sólo el producto actualizado.
     */
  static async updateById (req, res) {
    const { pid } = req.params
    const data = req.body
    const updatedProduct = await productService.updateProduct(pid, data)
    res.status(200).json(updatedProduct)
    //
  }

  /**
     * ruta DELETE ‘/products/:id’, la cual debe recibir por param el id del producto a eliminar
     */
  static async deleteById (req, res) {
    const { pid } = req.params
    const updatedProduct = await productService.deleteProduct(pid)
    res.status(200).json(updatedProduct)
  }
}
