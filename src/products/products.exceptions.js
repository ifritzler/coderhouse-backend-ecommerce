/**
    Represents an error when a product with a given ID is not found.
*/
class ProductNotFoundException extends Error {
    constructor(id) {
        super(`Product with id '${id}' is not found.`);
    }
}
/**
    Represents an error when a product code is duplicated.
 */
class ProductCodeDuplicatedException extends Error {
    constructor(code) {
        super(`Code '${code}' it is used yet. Please try again with another one.`);
    }
}
/**
    Represents an error when a product is missing required properties.
*/
class ProductValidationError extends Error {
    constructor() {
        super('Product have missing props. Please fill every required props and try again.');
    }
}

module.exports = {
    ProductNotFoundException,
    ProductCodeDuplicatedException,
    ProductValidationError
};
