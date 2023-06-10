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

export class NoStockProductException extends Error {
  constructor (id) {
    super(`Product with id '${id}' does not have enought stock.`)
  }
}
