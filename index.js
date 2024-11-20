require('express-async-errors')
const express = require('express')
const cors = require('cors')
const connectDb = require('./src/db/config.js')
const logger = require('./src/utils/logger.js')
const envVars = require('./src/utils/environmentsVars.js')
const { blogsRoutes, userRoutes } = require('./src/routes/index.js')
const {
  handleError,
  tokenExtractor,
  userExtractor,
} = require('./src/middlewares/index.js')

const app = express()

app.use(cors())
app.use(express.json())
connectDb(envVars.MONGO_URI)

//Token:
app.use(tokenExtractor)

//Routes:
app.use('/api/blogs', userExtractor, blogsRoutes)
app.use('/api/users', userRoutes)

// Error handling middleware
app.use(handleError)

app.listen(envVars.PORT, () => {
  logger.info(`Server running on port ${envVars.PORT}`)
})
module.exports = app
