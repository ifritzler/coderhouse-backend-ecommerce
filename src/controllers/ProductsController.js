const productService = require('../services/products/ProductService.js');

class ProductsController {
    constructor() {
        this.productService = productService
    };

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

    static async getById(req, res) {
        try {
            const { pid } = req.params;
            const product = await productService.getProductById(parseInt(pid));
            res.status(200).json(product);
        } catch (error) {
            res.status(404).json({
                error: error.message
            });
        }
    }
}

module.exports = ProductsController;
