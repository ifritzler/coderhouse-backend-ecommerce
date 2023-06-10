export class ProductNotFoundError extends Error {
  constructor (id) {
    super('Product not found with id ' + id)
  }
}
export class ProductCodeDuplicatedError extends Error {
  constructor (code) {
    super('Product code ' + code + ' is already exists.')
  }
}
export class ProductValidationError extends Error {
  constructor () {
    super('There are fields missing on product create/update.')
  }
}
