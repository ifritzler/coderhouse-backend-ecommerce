import productsService from "../services/ProductsService.js"


class ClientController {
  static async home(req, res) {
    const products = await productsService.getProducts()
    res.render('index', {title: 'Rozha Home', products})
  }
}

export default ClientController
