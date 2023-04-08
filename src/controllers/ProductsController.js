const productService = require('../services/products/ProductService.js');

class ProductsController {
    constructor() {
        this.productService = productService;
    };
    /**
     * El servidor debe contar con los siguientes endpoints:
     * ruta ‘/products’, la cual debe leer el archivo de productos y devolverlos 
     * dentro de un objeto agregar el soporte para recibir por query param 
     * el valor ?limit= el cual recibirá un límite de resultados.
     */
    static async getAll(req, res) {
        const limit = parseInt(req.query.limit || 20);
        if (isNaN(limit)) {
            return res.status(400).json({
                error: "The query param 'limit' must be a valid number"
            });
        }
        const products = await productService.getProducts(limit);
        res.status(200).json(products);
    }
    /**
     * ruta ‘/products/:pid’, la cual debe recibir por req.params el pid (product Id) 
     * y devolver sólo el producto solicitado, en lugar de todos los productos.
     */
    static async getById(req, res) {
        const { pid } = req.params;
        const product = await productService.getProductById(parseInt(pid));
        res.status(200).json(product);
    }
}

module.exports = ProductsController;
