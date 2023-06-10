import createError from 'http-errors'

const errorHandler = (err, req, res, next) => {
  if (err instanceof createError.HttpError) {
    return res.status(err.status).json({
      success: false,
      error: err.message
    })
  }
  console.log(err.message)
  return res.status(500).json({
    success: false,
    error: 'Ha ocurrido un error inesperado. Contacte con un administrador'
  })
}

export default errorHandler
