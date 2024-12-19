const Blog = require('../../db/models/Blog.js')
const User = require('../../db/models/User.js')
const generateError = require('../../utils/generateError.js')

const newBlog = async (request, response) => {
  const userId = request.user.id
  if (!userId) {
    return generateError(
      'User is not authenticated or the token has expired ',
      401
    )
  }
  const blogOwner = await User.findById(userId)
  if (!blogOwner) {
    return generateError('User not found in the database', 404)
  }

  const blog = new Blog({ ...request.body, user: blogOwner._id })
  const savedBlog = await blog.save()

  blogOwner.blogs = [...blogOwner.blogs, savedBlog._id]
  const mongoResponse = await blogOwner.save()
  if (!mongoResponse) {
    await savedBlog.delete()
    return generateError('Failed to save user', 500)
  }

  const blogToSend = {
    title: savedBlog.title,
    author: savedBlog.author,
    url: savedBlog.url,
    likes: savedBlog.likes,
    id: savedBlog._id.toString(),
    user: {
      id: savedBlog.user.toString(),
      name: blogOwner.name,
      username: blogOwner.username,
    },
  }
  response.status(201).json(blogToSend)
}

module.exports = newBlog
