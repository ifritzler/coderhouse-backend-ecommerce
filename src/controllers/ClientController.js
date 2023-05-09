import productsService from "../services/ProductsService.js"


class ClientController {
  static async home(req, res) {
    const products = await productsService.getProducts()
    res.render('index', {title: 'Rozha Home', products})
  }

  static async realtime(req, res) {
    const products = await productsService.getProducts()
    res.render('realtime', {title: 'products' })
  }
}

export default ClientController
