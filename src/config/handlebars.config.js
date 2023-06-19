import { engine } from 'express-handlebars'

export function initHandleBars (expressApp) {
  expressApp.engine('handlebars', engine())
  expressApp.set('view engine', 'handlebars')
  expressApp.set('views', './views')
}
