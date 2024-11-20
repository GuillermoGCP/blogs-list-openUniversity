const jwt = require('jsonwebtoken')
const User = require('../db/models/User.js')

const userExtractor = async (req, _res, next) => {
  if (!req.token) {
    req.user = null
    return next()
  }

  const decodedToken = jwt.verify(req.token, process.env.SECRET)

  if (!decodedToken.id) {
    req.user = null
    return next()
  }

  const user = await User.findById(decodedToken.id)

  req.user = user || null
  next()
}

module.exports = userExtractor
