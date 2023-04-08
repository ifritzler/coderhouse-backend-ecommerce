const express = require('express');
const productManager = require('./ProductManager.js');

const app = express();
const router = express.Router()

/**
 * El servidor debe contar con los siguientes endpoints:
 * ruta ‘/products’, la cual debe leer el archivo de productos y devolverlos 
 * dentro de un objeto agregar el soporte para recibir por query param 
 * el valor ?limit= el cual recibirá un límite de resultados.
 */
router.get('/products', async (req, res) => {
    const limit = parseInt(req.query.limit || 20);
    if(isNaN(limit)) {
        return res.status(400).json({
            error: "The query param 'limit' must be a valid number"
        })
    }
    const products = await productManager.getProducts(limit);
    res.status(200).json(products);
})

/**
 * ruta ‘/products/:pid’, la cual debe recibir por req.params el pid (product Id) 
 * y devolver sólo el producto solicitado, en lugar de todos los productos.
 */
router.get('/products/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productManager.getProductById(parseInt(pid));
        res.status(200).json(product);
    }catch (error) {
        res.status(404).json({
            error: error.message
        })
    }
})

app.use(router);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server up and running on port ${PORT} 🚀`);
})
