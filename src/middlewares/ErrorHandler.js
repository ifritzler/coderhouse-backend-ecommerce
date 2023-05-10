import ApplicationError from '../exceptions/ApplicationError.js'
import { removeUploadImages } from '../utils.js'

class ErrorHandler {
  static async intercept(error, req, res, _next) {

    if (error instanceof ApplicationError) {
      res.status(error.status).json({
        success: false,
        error: error.message,
        errorList: error.errors
      })
      return await removeUploadImages(null, req)
    }
    // TODO: Usar loggers para guardar cada uno de los errores y asignarle un ID unico para identificarlo.
    console.error({ errorMessage: error.message, errorStack: error.stack })
    res.status(500).json({
      success: false,
      message: 'Unexpected error. Please contact to an administrator.'
    })
    await removeUploadImages(null, req)
  }
}

export default ErrorHandler
