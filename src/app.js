import { engine } from 'express-handlebars'
import express from 'express'
import apiRouter from './routes/api.router.js'
import ErrorHandler from './middlewares/ErrorHandler.js'
const app = express()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './views')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/', express.static('public'))

app.get('/', (_req, res) => {
  res.render('index', { title: 'Hello' })
})

app.use('/api', apiRouter)
app.use(ErrorHandler.intercept)

const PORT = 8080

app.listen(PORT, () => {
  console.log(`Server up and running on port ${PORT} 🚀`)
})
