import { create } from 'express-handlebars'

const hbs = create({
  extname: 'handlebars',
  encoding: 'utf-8'
})

export const handlebarsConfiguration = (expressApp) => {
  expressApp.engine('handlebars', hbs.engine)
  expressApp.set('view engine', 'handlebars')
  expressApp.set('views', './views')
}