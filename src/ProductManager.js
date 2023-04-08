const fs = require('fs');

function cleanUndefinedProperties(obj) {
    const newObject = {};
    for (let prop in obj) {
        if (typeof obj[prop] !== 'undefined') {
            newObject[prop] = obj[prop];
        }
    }
    return newObject;
}

class ProductManager {
    constructor(path) {
        this.path = path;
    }
    async addProduct(productInputData) {
        const { title, description, price, thumbnail, code, stock } = productInputData;
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error('The properties "title", "description", "price", "thumbnail", "code" and "stock" are required.');
        }
        const products = await this.getProducts();
        if (products.find(product => product.code === code)) {
            throw new Error(`The code ${code} is already exists. Please try again with different code.`);
        }
        const id = products[products.length - 1]?.id + 1 || 1;
        const newProduct = {
            id, title, description, price, thumbnail, code, stock
        };
        products.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        return newProduct;
    }
    async getProducts() {
        const products = fs.existsSync(this.path)
            ? JSON.parse(await fs.promises.readFile(this.path, { encoding: 'utf-8' }))
            : [];
        return products;
    }
    async getProductById(pid) {
        const products = await this.getProducts();
        const found = products.find(product => product.id === pid);
        if (!found) {
            throw new Error(`Product with id ${pid} not found.`);
        }
        return found;
    }
    async updateProduct(pid, data) {
        try {
            const product = await this.getProductById(pid);
            const { id: _id, ...changes } = data;
            const unclenedChanges = {
                title: changes.title,
                description: changes.description,
                price: changes.price,
                thumbnail: changes.thumbnail,
                code: changes.code,
                stock: changes.stock
            };
            const productChanges = cleanUndefinedProperties(unclenedChanges);
            const productUpdated = { ...product, ...productChanges };
            const products = await this.getProducts();
            const productIndex = products.findIndex(p => p.id === pid);
            products[productIndex] = productUpdated;
            
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
            return productUpdated;
        } catch (error) {
            throw error
        }
    }
    async deleteProduct (pid) {
        const products = await this.getProducts();
        if(products.find(product => product.id === id)) throw new Error(`Product with id ${pid} not found.`);
        const newProducts = products.filter(product => product.id !== pid);
        await fs.promises.writeFile(this.path, JSON.stringify(newProducts, null, 2));
    }
}

module.exports = ProductManager;
