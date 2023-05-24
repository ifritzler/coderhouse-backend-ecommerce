const dotenv = require('dotenv')
const path = require('path')
const result = dotenv.config({ path: path.resolve(__dirname, `../../.env.${process.env.NODE_ENV}`.trim()) })

if (result.error) {
  throw result.error
}

const { parsed: envConfig } = result

module.exports = {
  PORT: envConfig.PORT || 8080,
  MONGO_URI: envConfig.MONGO_URI
}
