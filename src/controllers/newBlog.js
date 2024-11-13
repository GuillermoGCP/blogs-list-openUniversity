const Blog = require('../db/models/Blog.js')
const newBlog = (request, response) => {
  console.log('Data', request.body)
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
}

module.exports = newBlog
