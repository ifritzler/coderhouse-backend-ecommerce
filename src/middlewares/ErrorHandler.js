import ApplicationError from '../exceptions/ApplicationError.js'
import { removeUploadImages } from '../utils.js'

class ErrorHandler {
  static async intercept (error, req, res, _next) {
    await removeUploadImages(null, req.files)
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

export default ErrorHandler
