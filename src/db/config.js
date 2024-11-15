const mongoose = require('mongoose')
const logger = require('../utils/logger.js')

const dbName =
  process.env.NODE_ENV === 'test' ? 'Open-University-Test' : 'Open-University'
const connectDB = (uri) => {
  mongoose
    .connect(uri, {
      dbName: dbName,
    })
    .then((conn) => logger.info(`MongoDB connected: ${conn.connection.host}`))
    .catch((error) => logger.error(`Conection error: ${error.message}`))
}

module.exports = connectDB
