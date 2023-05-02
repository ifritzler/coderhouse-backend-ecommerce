/**
    Represents an error when a cart with a given ID is not found.
*/
export class CartNotFoundException extends Error {
  constructor (id) {
    super(`Cart with id '${id}' is not found.`)
  }
}

export class ProductNotFoundInCartException extends Error {
  constructor (cid, pid) {
    super(`Product with id '${pid}' does not exists in cart ${cid}.`)
  }
}
