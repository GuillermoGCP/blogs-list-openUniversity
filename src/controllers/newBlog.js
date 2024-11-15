const Blog = require('../db/models/Blog.js')
const newBlog = (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
}

module.exports = newBlog
