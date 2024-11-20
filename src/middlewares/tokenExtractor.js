const tokenExtractor = (req, _res, next) => {
  const authorization = req.get('authorization')

  if (authorization && authorization.startsWith('Bearer ')) {
    req.token = authorization.replace('Bearer ', '')
  } else req.token = null

  next()
}
module.exports = tokenExtractor
