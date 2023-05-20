const dotenv = require('dotenv')
const config = dotenv.config()

module.exports = {
  PORT: config.parsed?.PORT || 8080,
  NODE_ENV: config.parsed?.NODE_ENV || 'development',
  MONGO_URI: config.parsed?.MONGO_URI
}
