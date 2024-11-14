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
