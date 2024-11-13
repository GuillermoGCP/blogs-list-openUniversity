const express = require('express')
const { getBlogs, newBlog } = require('../controllers/index.js')
const router = express.Router()

router.get('/api/blogs', getBlogs)
router.post('/api/blogs', newBlog)

module.exports = router
