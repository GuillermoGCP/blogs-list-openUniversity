const _ = require('lodash')
const bcrypt = require('bcryptjs')
const data = require('../tests/dataToTest.js')
const User = require('../db/models/User.js')

const dummy = (blogs) => {
  if (Array.isArray(blogs)) {
    if (
      blogs.length === 0 ||
      blogs.every((item) => typeof item === 'object' && item !== null)
    ) {
      return 1
    }
  }
  return 2
}
const totalLikes = (blogs) => {
  const sum = blogs.reduce((acc, iter) => {
    return (acc += iter.likes)
  }, 0)
  return sum
}
module.exports = { dummy, totalLikes }

const favoriteBlog = (blogs) => {
  if (blogs.length === 0 || !Array.isArray(blogs)) {
    return null
  }

  return blogs.reduce((favorite, current) => {
    return current.likes > (favorite.likes || 0) ? current : favorite
  }, {})
}

//Using Lodash:
function mostBlogs(blogs) {
  if (!Array.isArray(blogs) || blogs.length === 0) return null

  const groupedByAuthor = _.groupBy(blogs, 'author')

  const blogsCount = _.map(groupedByAuthor, (blogsList, author) => ({
    author: author,
    blogs: blogsList.length,
  }))

  const authorWithMostBlogs = _.maxBy(blogsCount, 'blogs')
  return authorWithMostBlogs
}

const mostLikes = (blogs) => {
  if (!Array.isArray(blogs) || blogs.length === 0) return null

  const groupedByAuthor = _.groupBy(blogs, 'author')

  const likesCount = _.map(groupedByAuthor, (blogsList, author) => ({
    author: author,
    likes: _.sumBy(blogsList, 'likes'),
  }))

  const authorWithMostLikes = _.maxBy(likesCount, 'likes')
  return authorWithMostLikes
}

const createUser = async (userData = data.newUser) => {
  const salt = bcrypt.genSaltSync(10)
  const hashedPassword = bcrypt.hashSync(userData.password, salt)
  const user = new User({
    username: userData.username,
    name: userData.name,
    passwordHash: hashedPassword,
  })
  const createdUser = await user.save()
  return createdUser
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  createUser,
}
