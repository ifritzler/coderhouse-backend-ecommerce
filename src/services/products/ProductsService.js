const fs = require('fs');
const cleanUndefinedProperties = require('../../utils.js');
const { ProductValidationError, ProductCodeDuplicatedException, ProductNotFoundException } = require('../../exceptions/product/product.exceptions.js');

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    async addProduct(productInputData = {}) {
        const { title, description, price, thumbnail, code, stock } = productInputData;
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new ProductValidationError();
        }
        const products = await this.getProducts();
        if (products.find(product => product.code === code)) {
            throw new ProductCodeDuplicatedException(code);
        }
        const id = products[products.length - 1]?.id + 1 || 1;
        const newProduct = {
            id, title, description, price, thumbnail, code, stock
        };
        products.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        return newProduct;
    }

    async getProducts(limit = null) {
        const products = fs.existsSync(this.path)
            ? JSON.parse(await fs.promises.readFile(this.path, { encoding: 'utf-8' }))
            : [];
        // Si se recibe un límite, sólo devolver el número de productos solicitados
        // Si no se recibe query de límite, se devolverán todos los productos
        return limit ? products.slice(0, limit) : products;
    }

    async getProductById(pid) {
        const products = await this.getProducts();
        const found = products.find(product => product.id === pid);
        if (!found) {
            throw new ProductNotFoundException(pid);
        }
        return found;
    }

    async updateProduct(pid, data = {}) {
        const { id: _id, ...changes } = data;
        // Limpio los datos que me llegan
        const unclenedChanges = {
            title: changes.title,
            description: changes.description,
            price: changes.price,
            thumbnail: changes.thumbnail,
            code: changes.code,
            stock: changes.stock
        };
        const productChanges = cleanUndefinedProperties(unclenedChanges);
        // Obtengo los productos y busco el indice del producto, si no existe lanzo una excepcion.
        const products = await this.getProducts();
        const productIndex = products.findIndex(p => p.id === pid);
        if(productIndex === -1) throw new ProductNotFoundException(pid);
        // Valido si hay code y si ya existe lanzo una excepcion.
        if(products.find(p => p.code === productChanges.code)) throw new ProductCodeDuplicatedException(productChanges.code)
        // Consigo el producto usando concepto de inmutabiliad.
        const product = {...products[productIndex]};
        // Actualizo los datos del producto con los datos que me llegaron ya limpios.
        const productUpdated = { ...product, ...productChanges };
        // Creo la nueva lista de productos y actualizo el indice correspondiente.
        const newProducts = [...products];
        newProducts[productIndex] = productUpdated;
        // Sobre escribo el archivo con los nuevos cambios.
        await fs.promises.writeFile(this.path, JSON.stringify(newProducts, null, 2));
        return productUpdated;
    }
    
    async deleteProduct(pid) {
        const products = await this.getProducts();
        if (products.find(product => product.id === id)) throw new ProductNotFoundException(pid);
        const newProducts = products.filter(product => product.id !== pid);
        await fs.promises.writeFile(this.path, JSON.stringify(newProducts, null, 2));
    }
}

module.exports = new ProductManager('./database/products.json');
