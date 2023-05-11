function deleteProductFromList(e) {
  const cardProduct = e.closest(".product-store-item")
  cardProduct.remove()
  // TODO: ELIMINAR CON PETICION AL FRONT, SOLO SE ESTA ELIMINANDO DE LA VISTA
}