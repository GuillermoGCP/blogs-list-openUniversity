const Blog = require('../../db/models/Blog.js')
const generateError = require('../../utils/generateError.js')

const deleteBlog = async (req, res) => {
  const userId = req.user.id
  if (!userId) {
    return generateError(
      'User is not authenticated or the token has expired ',
      401
    )
  }
  const blog = await Blog.findById(req.params.id)
  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' })
  }

  if (blog.user.toString() !== userId)
    generateError('You are not the owner of this blog', 401)

  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
}
module.exports = deleteBlog
