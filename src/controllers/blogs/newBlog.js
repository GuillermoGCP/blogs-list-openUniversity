const Blog = require('../../db/models/Blog.js')
const newBlog = async (request, response) => {
  const blog = new Blog(request.body)
  const result = await blog.save()
  response.status(201).json(result)
}

module.exports = newBlog
