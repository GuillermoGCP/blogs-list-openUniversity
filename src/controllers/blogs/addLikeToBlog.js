const Blog = require('../../db/models/Blog.js')

const addLikeToBlog = async (req, res) => {
  const blogId = req.params.id

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
