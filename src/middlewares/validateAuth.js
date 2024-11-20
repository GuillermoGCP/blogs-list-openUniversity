const jwt = require('jsonwebtoken')
const generateError = require('../utils/generateError.js')
const getTokenFrom = require('../middlewares/getTokenFrom.js')

const validateAuth = (req, _res, next) => {
  const token = getTokenFrom(req)

  if (!token) {
    generateError('Authorization is required', 401)
  }

  const decodedToken = jwt.verify(token, process.env.SECRET)
  if (!(decodedToken.id && decodedToken.username))
    generateError('token has not id or username properties', 401)

  req.auth = decodedToken
  next()
}

module.exports = validateAuth