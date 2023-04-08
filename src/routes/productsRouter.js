const { Router } = require('express');
const ProductsController = require('../controllers/ProductsController.js');

const productsRouter = Router();

/**
 * El servidor debe contar con los siguientes endpoints:
 * ruta ‘/products’, la cual debe leer el archivo de productos y devolverlos 
 * dentro de un objeto agregar el soporte para recibir por query param 
 * el valor ?limit= el cual recibirá un límite de resultados.
 */
productsRouter.get('/', ProductsController.getAll);

/**
 * ruta ‘/products/:pid’, la cual debe recibir por req.params el pid (product Id) 
 * y devolver sólo el producto solicitado, en lugar de todos los productos.
 */
productsRouter.get('/:pid', ProductsController.getById)

module.exports = productsRouter;
