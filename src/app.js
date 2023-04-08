const express = require('express');
const apiRouter = require('./routes/api.router.js');
const ErrorHandler = require('./middlewares/ErrorHandler.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api', apiRouter);
app.use(ErrorHandler.intercept);

module.exports = app;
