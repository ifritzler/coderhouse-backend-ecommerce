function ioMiddleware (io) {
  return (req, res, next) => {
    req.ioServer = io
    next()
  }
}
export default ioMiddleware
