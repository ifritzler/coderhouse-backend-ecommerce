import session from 'express-session'
import { MONGO_URI, SESSION_SECRET } from '../config/environ.js'
import MongoStore from 'connect-mongo'
import options from '../config/mongo.js'

export const mongoSession = session({
  secret: SESSION_SECRET,
  store: MongoStore.create({
    mongoUrl: MONGO_URI,
    ttl: 1 * 60 * 60, // time to leave
    mongoOptions: options,
    crypto: {
      secret: SESSION_SECRET
    }
  }),
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1 * 60 * 60 * 1000
  }
})
