/**
 * @author Ilan Emanuel Fritzler
 * @tutor Ivan Passalia
 */
// Mas adelante creo ideal poder centralizar los errores en interceptores y middlewares cuando se comienze con express.
// Los comentarios pueden ser excesivos para tan poco codigo, pero va con la intencion de dejar cada consigna escrita 
// donde el codigo soluciona 
// y dar cuenta de que no falta nada de lo que se pide ademas de agregar el proceso de pensamiento de la entrega.

const fs = require('fs');

// Devuelve un conjunto de propiedades pertenecientes a un objeto que no tengan un valor indefinido.
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
    // La clase ProductManager debe contar con una variable this.path, el cual se inicializará desde el constructor y debe recibir 
    // la ruta a trabajar desde el momento de generar su instancia.
    constructor(path) {
        this.path = path;
    }
    // addProduct debe recibir un objeto con el formato previamente especificado, asignarle un id autoincrementable y 
    // guardarlo en el arreglo (siempre guardarlo como un array en el archivo).
    // Debe guardar objetos con el siguiente formato:
    async addProduct(productInputData) {
        const { title, description, price, thumbnail, code, stock } = productInputData;
        // Validar que no se repita el campo “code” y que todos los campos sean obligatorios.
        // Mas adelante pueden validarse tambien los tipos de dato para proveer de robustes al backend.
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            throw new Error('The properties "title", "description", "price", "thumbnail", "code" and "stock" are required.');
        }
        const products = await this.getProducts();
        // debe arrojar error en caso de querer sumar un producto con un codigo existente.
        if (products.find(product => product.code === code)) {
            throw new Error(`The code ${code} is already exists. Please try again with different code.`);
        }
        // Al agregarlo, debe crearse con un id autoincrementable
        // Uso el operador "optional chaining (?.)" para evitar posible error de acceso por desborde y asignar por default el valor 1 al id.
        const id = products[products.length - 1]?.id + 1 || 1;
        const newProduct = {
            id, title, description, price, thumbnail, code, stock
        };
        products.push(newProduct);
        await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
        // Mas adelante devolver el nuevo producto con su id puede ser de utilidad para no repetir una query a base de datos.
        return newProduct;
    }
    // El método getProducts, debe leer el archivo de productos y devolver todos los productos en formato de arreglo.
    async getProducts() {
        // Si el archivo existe busco los datos, de lo contrario devuelvo un arreglo vacio.
        const products = fs.existsSync(this.path)
            ? JSON.parse(await fs.promises.readFile(this.path, { encoding: 'utf-8' }))
            : [];
        return products;
    }
    // El método getProductById, debe recibir un id, y tras leer el archivo, 
    // debe buscar el producto con el id especificado y devolverlo en formato objeto.
    async getProductById(pid) {
        const products = await this.getProducts();
        const found = products.find(product => product.id === pid);
        if (!found) {
            throw new Error(`Product with id ${pid} not found.`);
        }
        return found;
    }
    // Debe tener un método updateProduct, el cual debe recibir el id del producto a actualizar, 
    // así también como el campo a actualizar (puede ser el objeto completo, como en una DB), y 
    // debe actualizar el producto que tenga ese id en el archivo. NO DEBE BORRARSE SU ID 
    async updateProduct(pid, data) {
        try {
            const product = await this.getProductById(pid);
            // Saco el id por las dudas que me lo manden en el objeto.
            const { id: _id, ...changes } = data;
            // Este proceso de limpieza me asegura de forma declarativa que no voy a poder ingresar
            // ningun atributo extra al primer nivel del producto a travez de un update.
            const unclenedChanges = {
                title: changes.title,
                description: changes.description,
                price: changes.price,
                thumbnail: changes.thumbnail,
                code: changes.code,
                stock: changes.stock
            };
            const productChanges = cleanUndefinedProperties(unclenedChanges);
            // Genero el nuevo producto con sus cambios.
            const productUpdated = { ...product, ...productChanges };
            const products = await this.getProducts();
            const productIndex = products.findIndex(p => p.id === pid);
            // Actualizo el producto en la lista de productos.
            products[productIndex] = productUpdated;
            // Escribo en el archivo la modificacion.
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));
            return productUpdated;
        } catch (error) {
            throw error
        }
    }
}

/**
 * @test
 * Testeando el entregable
 */
// Se creará una instancia de la clase “ProductManager”
async function testingDeliverable() {
    try {
        const productManager = new ProductManager('products.json');
        // Se llamará “getProducts” recién creada la instancia, debe devolver un arreglo vacío []
        console.log(await productManager.getProducts());
        // Se llamará al método “addProduct” con los siguientes campos:
        const productInputData = {
            title: 'Prueba',
            description: 'Este es un producto prueba',
            price: 200,
            thumbnail: 'Sin imagen',
            code: 'abc123',
            stock: 25
        };
        const secondProductInputData = {
            title: 'Prueba2',
            description: 'Este es un producto prueba2',
            price: 200,
            thumbnail: 'Sin imagen',
            code: 'abc1232',
            stock: 20
        };
        // El objeto debe agregarse satisfactoriamente con un id generado automáticamente SIN REPETIRSE
        await productManager.addProduct(productInputData);
        await productManager.addProduct(secondProductInputData);
        // Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
        console.log(await productManager.getProducts());
        // Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
        await productManager.addProduct(productInputData);
        // Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
        const productFound = await productManager.getProductById(1);
        // const productFoundWithError = productManager.getProductById(999);
        console.log({ productFound });

        // Actualizacion de Producto con id 1
        // Se le tratan de ingresar un id y una propiedad extra para verificar que esta todo funcionando ok.
        const productUpdated = await productManager.updateProduct(1, {
            id: 999,
            greetings: 'hello everyone', 
            title: 'Prueba actualizada2'
         });
        console.log(productUpdated);
    } catch (error) {
        console.error(error);
    }
}

testingDeliverable();
