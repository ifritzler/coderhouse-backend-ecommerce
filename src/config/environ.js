import dotenv from 'dotenv'
import path from 'path'
import { __dirname } from '../utils.js'

const result = dotenv.config({ path: path.resolve(__dirname, `../.env.${process.env.NODE_ENV}`.trim()) })

const { parsed: envConfig } = result

export const PORT = envConfig.PORT || 8080
export const MONGO_URI = envConfig.MONGO_URI
