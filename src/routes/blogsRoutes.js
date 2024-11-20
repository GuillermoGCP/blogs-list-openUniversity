const express = require('express')
const validateAuth = require('../middlewares/validateAuth.js')

const {
  getBlogs,
  newBlog,
  deleteBlog,
  updateBlog,
} = require('../controllers/index.js')

const router = express.Router()

router.get('/api/blogs', getBlogs)
router.post('/api/blogs', validateAuth, newBlog)
router.delete('/api/blogs/:id', validateAuth, deleteBlog)
router.put('/api/blogs/:id', updateBlog)

module.exports = router
