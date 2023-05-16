class ApplicationError extends Error {
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

export default ApplicationError
