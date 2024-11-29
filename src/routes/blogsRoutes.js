const express = require('express')
const validateAuth = require('../middlewares/validateAuth.js')

const {
  getBlogs,
  newBlog,
  deleteBlog,
  updateBlog,
  addLikeToBlog,
} = require('../controllers/index.js')

const router = express.Router()

router.get('/', getBlogs)
router.post('/', validateAuth, newBlog)
router.delete('/:id', validateAuth, deleteBlog)
router.put('/:id', validateAuth, updateBlog)
router.patch('/likes/:id', addLikeToBlog)

module.exports = router
