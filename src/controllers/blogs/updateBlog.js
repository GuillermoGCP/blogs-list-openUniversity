const Blog = require('../../db/models/Blog.js')

const updateBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  if (!blog) {
    return res.status(404).json({ error: 'Blog not found' })
  }
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
