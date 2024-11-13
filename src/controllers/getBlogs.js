const Blog = require('../db/models/Blog.js')
const getBlogs = (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
  })
}

module.exports = getBlogs
