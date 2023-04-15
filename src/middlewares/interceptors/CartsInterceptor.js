const ApplicationError = require("../../exceptions/ApplicationError.js");
const { CartNotFoundException, ProductNotFoundInCartException } = require("../../exceptions/carts/cart.exceptions.js");

/**
 * Interceptor for handling cart-related exceptions.
 * @class
*/
class CartsInterceptor {
    constructor() { };
    /**
     * Intercepts cart-related exceptions and maps them to appropriate HTTP error codes.
     * @static
     * @param {Error} err - The error object to be intercepted.
     * @param {Object} _req - The request object.
     * @param {Object} _res - The response object.
     * @param {Function} next - The next middleware function.
     * @returns {void}
    */
    static intercept(err, _req, _res, next) {
        if (
            err instanceof CartNotFoundException ||
            err instanceof ProductNotFoundInCartException
        ) {
            return next(new ApplicationError(err.message, 404));
        }
        throw err;
    }
}

module.exports = CartsInterceptor;
