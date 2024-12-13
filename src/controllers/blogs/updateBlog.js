const Blog = require('../../db/models/Blog.js')
const User = require('../../db/models/User.js')
const generateError = require('../../utils/generateError.js')

const updateBlog = async (req, res) => {
  const userId = req.user.id
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

  const blog = await Blog.findById(req.params.id)
  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' })
  }

  if (blog.user.toString() !== blogOwner.id)
    generateError('You are not the owner of this blog', 401)

  const blogToUpdate = {
    title: req.body.title,
    author: req.body.author,
    url: req.body.url,
    likes: req.body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    req.params.id,
    blogToUpdate,
    {
      new: true,
    }
  )
  res.status(200).json(updatedBlog)
}
module.exports = updateBlog
