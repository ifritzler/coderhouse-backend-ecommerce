export class ProductNotFoundException extends Error {
  constructor (id) {
    super(`Product with id '${id}' is not found.`)
  }
}

export class ProductCodeDuplicatedException extends Error {
  constructor (code) {
    super(`Code '${code}' it is used yet. Please try again with another one.`)
  }
}

export class ProductValidationError extends Error {
  constructor () {
    super('Product have missing props. Please fill every required props and try again.')
  }
}
