const express = require('express')
const {
  getBlogs,
  newBlog,
  deleteBlog,
  updateBlog,
} = require('../controllers/index.js')
const router = express.Router()

router.get('/api/blogs', getBlogs)
router.post('/api/blogs', newBlog)
router.delete('/api/blogs/:id', deleteBlog)
router.put('/api/blogs/:id', updateBlog)

module.exports = router
