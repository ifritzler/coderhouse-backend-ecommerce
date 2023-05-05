class ProductNotFoundException extends Error {
  constructor (id) {
    super(`Product with id '${id}' is not found.`)
  }
}

class ProductCodeDuplicatedException extends Error {
  constructor (code) {
    super(`Code '${code}' it is used yet. Please try again with another one.`)
  }
}

class ProductValidationError extends Error {
  constructor () {
    super('Product have missing props. Please fill every required props and try again.')
  }
}

module.exports = {
  ProductNotFoundException,
  ProductCodeDuplicatedException,
  ProductValidationError
}
