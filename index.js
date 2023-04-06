/**
 * @author Ilan Emanuel Fritzler
 * @tutor Ivan Passalia
 */
// En esta entrega decidi utilizar solo console.error en lugar de lanzar errores con throw new Error('mensaje');
// Ya que esto aligera el proceso de testeo para el tutor. Dejaré en formato de comentario la forma ideal de trabajar con new Error
// Mas adelante creo ideal poder centralizar los errores en interceptores y middlewares cuando se comienze con express.
// Los comentarios pueden ser excesivos para tan poco codigo, pero va con la intencion de ir al grano en lo que pide la consigna 
// y dar cuenta de que no falta nada de lo que se pide ademas de agregar el proceso de pensamiento de la entrega.

class ProductManager {
    // Debe crearse desde su constructor con el elemento products, el cual será un arreglo vacío
    constructor() {
        this.products = [];
    }
    // Debe contar con un método “addProduct” el cual agregará un producto al arreglo de productos inicial.
    addProduct({ title, description, price, thumbnail, code, stock }) {
        // Validar que no se repita el campo “code” y que todos los campos sean obligatorios.
        // Mas adelante pueden validarse tambien los tipos de dato para proveer de robustes al backend.
        if(!title || !description || !price || !thumbnail || !code || !stock) {
            console.error('The properties "title", "description", "price", "thumbnail", "code" and "stock" are required.');
            // throw new Error('The properties "title", "description", "price", "thumbnail", "code" and "stock" are required.')
            return;
        }
        // debe arrojar error en caso de querer sumar un producto con un codigo existente.
        if(this.products.find(product => product.code === code)) {
            console.error(`The code ${code} is already exists. Please try again with different code.`);
            // throw new Error(`The code ${code} is already exists. Please try again with different code.`);
            return;
        }
        // Al agregarlo, debe crearse con un id autoincrementable
        // Uso el operador "optional chaining (?.)" para evitar posible error de acceso por desborde y asignar por default el valor 1 al id.
        const id = this.products[this.products.length - 1]?.id + 1 || 1;
        const newProduct = {
            id, title, description, price, thumbnail, code, stock
        };
        this.products.push(newProduct);
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
        if(!found) {
            console.error(`Product with id ${pid} not found.`);
            // throw new Error(`Product with id ${pid} not found.`);
            return;
        }
        return found;
    }
}
