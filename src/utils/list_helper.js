const _ = require('lodash')

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

  const blogsCount = _.map(
    _.toPairs(groupedByAuthor),
    ([author, blogsList]) => ({
      author: author,
      blogs: blogsList.length,
    })
  )

  const authorWithMostBlogs = _.maxBy(blogsCount, 'blogs')

  return authorWithMostBlogs
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs }
