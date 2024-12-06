const Blog = require('../../../db/models/Blog.js')
const User = require('../../../db/models/User.js')
const generateError = require('../../../utils/generateError.js')

const resetDb = async (req, res) => {
  if (process.env.NODE_ENV === 'test') {
    await User.deleteMany({})
    await Blog.deleteMany({})
    res.status(204).end()
  } else {
    generateError('App is not in test mode', 403)
  }
}
module.exports = resetDb
