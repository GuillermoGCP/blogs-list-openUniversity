const generateError = (msg, status) => {
  const error = new Error(msg)
  error.status = status || 500
  throw error
}
module.exports = generateError
