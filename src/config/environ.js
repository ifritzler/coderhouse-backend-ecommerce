import dotenv from 'dotenv'
dotenv.config()
import { __dirname } from '../utils.js'


export const PORT = process.env.PORT || 8080
export const MONGO_URI = process.env.MONGO_URI
export const SESSION_SECRET = process.env.SESSION_SECRET
