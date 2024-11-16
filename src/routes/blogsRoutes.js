const express = require('express')
const { getBlogs, newBlog, deleteBlog } = require('../controllers/index.js')
const router = express.Router()

router.get('/api/blogs', getBlogs)
router.post('/api/blogs', newBlog)
router.delete('/api/blogs/:id', deleteBlog)

module.exports = router
