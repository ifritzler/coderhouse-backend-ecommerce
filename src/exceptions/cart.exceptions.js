/**
    Represents an error when a cart with a given ID is not found.
    @class
    @extends Error
    @param {string} id - The ID of the product that was not found.
*/
export class CartNotFoundException extends Error {
  constructor(id) {
    super(`Cart with id '${id}' is not found.`)
  }
}

export class ProductNotFoundInCartException extends Error {
  constructor(cid, pid) {
    super(`Product with id '${pid}' does not exists in cart ${cid}.`)
  }
}

export class NoStockProductException extends Error {
  constructor(id) {
    super(`Cart with id '${id}' does not have enought stock.`)
  }
}