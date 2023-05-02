const { Router } = require('express')
const apiRouter = Router()

apiRouter.use('/', (req, res) => {
  res.render('index', { numbers: [1, 2, 3, 4, 5, 6, 7, 8] })
})

module.exports = apiRouter
