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

module.exports = { dummy }
