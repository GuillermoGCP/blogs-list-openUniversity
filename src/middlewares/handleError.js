const HandleError = (error, req, res, next) => {
  if (error.name === 'ValidationError') {
    return res.status(400).json({
      error: error.message,
    })
  }

  return res.json({ error: error.message })
}

module.exports = HandleError
