async function deleteProductFromList (e) {
  const cardProduct = e.closest('.product-store-item')
  cardProduct.remove()
}

async function deleteProductApi (e) {
  const id = e.closest('.product-img').querySelector('.carousel').id
  const response = await fetch(`/api/products/${id}`, {
    method: 'delete'
  })
  if (response.ok) {
    deleteProductFromList(e)
  } else {
    // TODO: MAKE AN ERROR MESSAGE OR TOAST ERROR OR SOMETHING ELSE
  }
}
