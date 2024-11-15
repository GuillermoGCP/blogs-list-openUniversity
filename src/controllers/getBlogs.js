const Blog = require('../db/models/Blog.js')
const getBlogs = async (request, response) => {
  const dataFromDb = await Blog.find({})
  response.json(dataFromDb)
}

module.exports = getBlogs
