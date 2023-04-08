# coderhouse-backend-ecommerce
Node.js ecommerce backend using MERN stack for full-stack development.

- **Student name**: Ilan Emanuel Fritzler
- **Tutor**: Ivan Passalia
- **Commission**: 51380

### 👨‍💻 Challenge 4: 1er Pre entrega de Proyecto Final

To complete "Pre entrega de Proyecto Final" for the course, I have implemented the necessary functionality using ECMAScript classes and advanced features with the file system library included in nodejs and the framework for web applications Express. The code for this challenge can be found in the appropriate files.

## 🏃‍♂️ Running the Project with npm

To run the project using npm, follow these steps:

1. Open your terminal and navigate to the root directory of the project.
2. Run the command `npm install`.
3. Run the command `npm run start`.
4. The project should now be running on your local server on port `8080` by default.

If you encounter any issues while running the project, check the project's documentation or contact the developer for assistance.

---

## ⁉ I have been using interceptors, WHY?
Example: 
```javascript
class ProductInterceptor {
    constructor() { };
    /**
     * Intercepts product-related exceptions and maps them to appropriate HTTP error codes.
     * @static
     * @param {Error} err - The error object to be intercepted.
     * @param {Object} _req - The request object.
     * @param {Object} _res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {void}
    */
    static intercept(err, _req, _res, next) {
        if (err instanceof ProductNotFoundException) return next(new ApplicationError(err.message, 404));
        if (err instanceof ProductCodeDuplicatedException) return next(new ApplicationError(err.message, 409));
        if (err instanceof ProductValidationError) return next(new ApplicationError(err.message, 400));
        throw err;
    }
}

module.exports = ProductInterceptor;
```
Use: 
```javascript

const { Router } = require('express');
const ProductsController = require('../controllers/ProductsController.js');
const asyncHandler = require('express-async-handler');
const ProductInterceptor = require('../middlewares/interceptors/ProductInterceptor.js');

const productsRouter = Router();

productsRouter.get('/', asyncHandler(ProductsController.getAll));
productsRouter.get('/:pid', asyncHandler(ProductsController.getById));

productsRouter.use(ProductInterceptor.intercept);

module.exports = productsRouter;
```

Because the way I've been manage errors in my API in a centralized and scalable way.

An interceptor is a piece of code that works like a typical error handler in Express, where the signature of the function has 4 arguments: error, request, response, and next.

This interceptor needs to be used like a simple error handler. It is used to handle errors from the service layer and create the corresponding ApplicationError with the correct status code, and so on. 

Then, the ErrorHandler the master piece of error handling in the API catch the ApplicationError and create the response to the client based on that, avoiding and preventing every single error that I've not been handled yet and throws an Internal Server Error instead.
```javascript
class ErrorHandler {
    constructor() { };
    /**
        Intercepts errors and sends appropriate responses to the client.
        @static
        @param {Error} error - The error object.
        @param {Object} _req - The request object.
        @param {Object} res - The response object.
        @param {Function} _next - The next middleware function.
    */
    static intercept(error, _req, res, _next) {
        if (error instanceof ApplicationError) {
            res.status(error.status).json({
                success: false,
                error: error.message,
                errorList: error.errors
            });
        } else {
            // TODO: Usar loggers para guardar cada uno de los errores y asignarle un ID unico para identificarlo.
            console.error({ errorMessage: error.message, errorStack: error.stack });
            res.status(500).json({
                success: false,
                message: 'Internal server error'
            });
        }
    }
}
```
Use:
```javascript
const express = require('express');
const apiRouter = require('./routes/api.router.js');
const ErrorHandler = require('./middlewares/ErrorHandler.js');

const app = express();

app.use('/api', apiRouter);
app.use(ErrorHandler.intercept);

module.exports = app;
```
---
# 🧃 Product Entity
### Database (file products.json) storage:
- **folder**: `./database/products.json`
## 🐕‍🦺 Service
- A ProductService class **(named before ProductManager)** that can be found in the `src/services/ProductService.js` file. The class includes the following methods:
  - addProduct
  - getProducts
  - getProductById
  - updateProduct
  - deleteProduct
  
  The code for these methods has been implemented using ECMAScript classes and advanced features.
  
## ⤴ Routes

- The routes can be found in the file `src/routes/products.router.js`
- All controllers (functions that will be triggered on http request event) are surround with `asyncHandler` function from `express-async-handler` external package. This is for avoid unnecessary try catch blocks, simplify code legibility and I'm used to better implementing the error handling system of the api.
- A ProductController class that can be found in the `src/controllers/ProductsController.js` file. The class includes the following methods:
  - getAll
  - getById
  - create
  - updateById
  - deleteById
  
  The code for these methods has been implemented using ECMAScript classes and advanced features.
- Endpoints: 

| Method | Endpoint             | Statuses            | Params       | Query params           |
| ------ | -------------------- | ------------------- | ------------ | ---------------------- |
| GET    | `/api/products`      | `200`               | `none`       | `limit: number = null` |
| POST   | `/api/products`      | `201`, `400`, `409` | `none`       | `none`                 |
| GET    | `/api/products/:pid` | `200`, `404`        | `id: number` | `none`                 |
| PUT    | `/api/products/:pid` | `200`, `400`, `409` | `id: number` | `none`                 |
| DELETE | `/api/products/:pid` | `200`, `404`        | `id: number` | `none`                 |
