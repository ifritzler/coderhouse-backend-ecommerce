/**
 * @author Ilan Emanuel Fritzler
 * @tutor Ivan Passalia
 */
// En esta entrega decidi utilizar solo console.error en lugar de lanzar errores con throw new Error('mensaje');
// Ya que esto aligera el proceso de testeo para el tutor. Dejaré en formato de comentario la forma ideal de trabajar con new Error
// Mas adelante creo ideal poder centralizar los errores en interceptores y middlewares cuando se comienze con express.
// Los comentarios pueden ser excesivos para tan poco codigo, pero va con la intencion de ir al grano en lo que pide la consigna 
// y dar cuenta de que no falta nada de lo que se pide ademas de agregar el proceso de pensamiento de la entrega.

const fs = require('fs');

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
        // Si el archivo existe busco los datos, de lo contrario devuelvo un arreglo vacio.
        const products = fs.existsSync(this.path)
            ? JSON.parse(await fs.promises.readFile(this.path, { encoding: 'utf-8' }))
            : [];
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
    // Debe contar con un método “getProducts” el cual debe devolver 
    // el arreglo con todos los productos creados hasta ese momento
    getProducts() {
        return this.products;
    }
    // getProductById debe devolver error si no encuentra el producto o el producto mismo en caso de encontrarlo
    getProductById(pid) {
        const found = this.products.find(product => product.id === pid);
        if (!found) {
            console.error(`Product with id ${pid} not found.`);
            // throw new Error(`Product with id ${pid} not found.`);
            return;
        }
        return found;
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
        console.log(productManager.getProducts());
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
        // await productManager.addProduct(productInputData);
        await productManager.addProduct(secondProductInputData);
        // Se llamará el método “getProducts” nuevamente, esta vez debe aparecer el producto recién agregado
        console.log(productManager.getProducts());
        // Se llamará al método “addProduct” con los mismos campos de arriba, debe arrojar un error porque el código estará repetido.
        await productManager.addProduct(productInputData);
        // Se evaluará que getProductById devuelva error si no encuentra el producto o el producto en caso de encontrarlo
        // const productFound = productManager.getProductById(1);
        // const productFoundWithError = productManager.getProductById(999);
    
        // console.log({ productFound, productFoundWithError });
    } catch (error) {
        console.error(error);
    }
}

testingDeliverable();
