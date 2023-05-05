const ApplicationError = require('../exceptions/ApplicationError.js')
/**
    A class that handles errors and sends appropriate responses to the client.
    @class
*/
class ErrorHandler {
  static intercept (error, _req, res, _next) {
    if (error instanceof ApplicationError) {
      return res.status(error.status).json({
        success: false,
        error: error.message,
        errorList: error.errors
      })
    }
    // TODO: Usar loggers para guardar cada uno de los errores y asignarle un ID unico para identificarlo.
    console.error({ errorMessage: error.message, errorStack: error.stack })
    res.status(500).json({
      success: false,
      message: 'Unexpected error. Please contact to an administrator.'
    })
  }
}

module.exports = ErrorHandler
