/* eslint-disable no-unused-vars */
function getProductCardById (id) {
  const productItems = Array.from(document.getElementsByClassName('product-store-item'))
  const itemToRemove = productItems.find(item => {
    const pid = item.querySelector('.carousel').id
    return pid === id
  })
  return itemToRemove
}

async function deleteProductApi (e) {
  const id = e.closest('.product-img').querySelector('.carousel').id
  const response = await fetch(`/api/products/${id}`, {
    method: 'delete'
  })
  try {
    if (response.ok) {
      const element = getProductCardById(id)
      element.remove()
    } else {
      // TODO: MAKE AN ERROR MESSAGE OR TOAST ERROR OR SOMETHING ELSE
    }
  } catch (error) {

  }
}
