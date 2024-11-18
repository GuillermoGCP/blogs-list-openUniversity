const Blog = require('../../db/models/Blog.js')

const deleteBlog = async (req, res, next) => {
  const blog = await Blog.findById(req.params.id)
  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' })
  }
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
}
module.exports = deleteBlog
