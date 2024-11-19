const Blog = require('../../db/models/Blog.js')
const User = require('../../db/models/User.js')
const generateError = require('../../utils/generateError.js')

const newBlog = async (request, response) => {
  const firstFindedUser = await User.findOne()
  if (!firstFindedUser) {
    return generateError('No users found in the database', 404)
  }

  const blog = new Blog({ ...request.body, user: firstFindedUser._id })
  const savedBlog = await blog.save()

  firstFindedUser.blogs = [...firstFindedUser.blogs, savedBlog._id]
  const mongoResponse = await firstFindedUser.save()
  if (!mongoResponse) {
    await blog.remove()
    return generateError('Failed to save user', 500)
  }

  response.status(201).json(savedBlog)
}

module.exports = newBlog
