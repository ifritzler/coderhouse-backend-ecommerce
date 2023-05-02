const path = require('path')
const express = require('express')
const ErrorHandler = require('../middlewares/ErrorHandler')
const apiRouter = require('../routers/api.router')
const handlebarsConfiguration = require('./handlebars.config')
const clientRouter = require('../routers/client.router')

const app = express()
handlebarsConfiguration(app)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.resolve('public')))

app.use('/api', apiRouter)
app.use('/', clientRouter)

app.use(ErrorHandler.intercept)

module.exports = app
