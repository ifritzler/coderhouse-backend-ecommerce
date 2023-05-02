import { Router } from 'express'

export const clientRouter = Router()

clientRouter.use('/', (req, res) => {
  res.render('index', { numbers: [1, 2, 3, 4, 5, 6, 7, 8] })
})
