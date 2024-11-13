const mongoose = require('mongoose')
const logger = require('../utils/logger.js')

const connectDB = (uri) => {
  mongoose
    .connect(uri, {
      dbName: 'Open-University',
    })
    .then((conn) => logger.info(`MongoDB connected: ${conn.connection.host}`))
    .catch((error) => logger.error(`Conection error: ${error.message}`))
}

module.exports = connectDB
