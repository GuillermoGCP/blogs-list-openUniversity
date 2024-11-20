const getBlogs = require('./blogs/getBlogs.js')
const newBlog = require('./blogs/newBlog.js')
const deleteBlog = require('./blogs/deleteBlog.js')
const updateBlog = require('./blogs/updateBlog.js')

const createUser = require('./users/createUser.js')
const getAllUsers = require('./users/getAllUsers.js')

const login = require('./users/login.js')

module.exports = {
  getBlogs,
  newBlog,
  deleteBlog,
  updateBlog,
  createUser,
  getAllUsers,
  login,
}
