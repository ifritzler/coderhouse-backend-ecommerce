/**
 * Class representing an interceptor for handling product-related exceptions.
 * @class
 * Creates an instance of ApplicationError.
 * @param {string} message - The error message.
 * @param {number} status - The HTTP status code.
 * @param {Array} [errors=null] - An optional array of error objects.
*/
class ApplicationError extends Error {
    constructor(message, status, errors = null) {
        super();
        Error.captureStackTrace(this, this.constructor);
        this.message = message;
        this.status = status;
        if (errors) {
            this.errors = errors;
        }
    }
}

module.exports = ApplicationError;
