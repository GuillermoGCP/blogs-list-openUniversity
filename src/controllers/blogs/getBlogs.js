const Blog = require('../../db/models/Blog.js')
const getBlogs = async (_request, response) => {
  const dataFromDb = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  })
  response.json(dataFromDb)
}

module.exports = getBlogs
