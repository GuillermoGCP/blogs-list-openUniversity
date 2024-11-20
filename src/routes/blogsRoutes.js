const express = require('express')
const validateAuth = require('../middlewares/validateAuth.js')

const {
  getBlogs,
  newBlog,
  deleteBlog,
  updateBlog,
} = require('../controllers/index.js')

const router = express.Router()

router.get('/', getBlogs)
router.post('/', validateAuth, newBlog)
router.delete('/:id', validateAuth, deleteBlog)
router.put('/:id', updateBlog)

module.exports = router
