class CartNotFoundException extends Error {
  constructor (id) {
    super(`Cart with id '${id}' is not found.`)
  }
}

class ProductNotFoundInCartException extends Error {
  constructor (cid, pid) {
    super(`Product with id '${pid}' does not exists in cart ${cid}.`)
  }
}

class NoStockProductException extends Error {
  constructor (id) {
    super(`Cart with id '${id}' does not have enought stock.`)
  }
}

module.exports = {
  CartNotFoundException,
  NoStockProductException,
  ProductNotFoundInCartException
}
