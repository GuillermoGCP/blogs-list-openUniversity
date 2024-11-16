const Blog = require('../db/models/Blog.js')

const invalidIdGenerator = async () => {
  const fakeBlog = new Blog({
    title: 'Fake title',
    author: 'Fake author',
    url: 'Fake url',
  })
  await fakeBlog.save()
  await fakeBlog.deleteOne()

  return fakeBlog._id.toString()
}
module.exports = invalidIdGenerator
