const ApplicationError = require("../exceptions/ApplicationError.js");
/**
    A class that handles errors and sends appropriate responses to the client.
    @class
*/
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

module.exports = ErrorHandler;
