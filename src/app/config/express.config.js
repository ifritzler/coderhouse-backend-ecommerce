import { resolve } from 'path'
import express from 'express'
import handlebarsConfiguration from './handlebars.config.js'
import ErrorHandler from '../middlewares/ErrorHandler.js'
import apiRouter from '../routers/api.router.js'
import clientRouter from '../routers/client.router.js'

const app = express()
handlebarsConfiguration(app)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(resolve('public')))

app.use('/api', apiRouter)
app.use('/', clientRouter)

app.use(ErrorHandler.intercept)

export default app
