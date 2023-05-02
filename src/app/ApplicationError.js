/**
 * Class representing an interceptor for handling product-related exceptions.
 */
export class ApplicationError extends Error {
  constructor (message, status, errors = null) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.message = message
    this.status = status
    if (errors) {
      this.errors = errors
    }
  }
}
