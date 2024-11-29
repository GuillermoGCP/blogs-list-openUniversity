const Blog = require('../../db/models/Blog.js')
const User = require('../../db/models/User.js')
const generateError = require('../../utils/generateError.js')

const addLikeToBlog = async (req, res) => {
  const userId = req.body.user
  const blogId = req.params.id

  const blogOwner = await User.findById(userId)
  if (!blogOwner) {
    return generateError('User not found in the database', 404)
  }

  const blog = await Blog.findById(blogId)
  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' })
  }

  const updatedBlog = await Blog.findByIdAndUpdate(
    blogId,
    { likes: req.body.likes },
    {
      new: true,
    }
  )
  res.status(200).json(updatedBlog)
}
module.exports = addLikeToBlog
