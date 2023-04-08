const ApplicationError = require("../../exceptions/ApplicationError.js");
const { ProductNotFoundException, ProductCodeDuplicatedException, ProductValidationError } = require("../../exceptions/product/product.exceptions.js");

/**
 * Interceptor for handling product-related exceptions.
 * @class
*/
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
