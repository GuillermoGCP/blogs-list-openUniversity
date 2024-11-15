const listHelper = require('../utils/list_helper.js')
const { test, describe } = require('node:test')
const assert = require('node:assert')
const data = require('./dataToTest.js')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1, 'Expected result to be 1')
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    assert.strictEqual(
      result,
      0,
      'Expected total likes to be 0 for an empty list'
    )
  })

  test('when list has only one blog, equals the likes of that blog', () => {
    const result = listHelper.totalLikes(data.listWithOneBlog)
    assert.strictEqual(
      result,
      5,
      'Expected sum of likes to match the likes of the single blog'
    )
  })

  test('of a bigger list is calculated right', () => {
    const result = listHelper.totalLikes(data.bigList)
    assert.strictEqual(
      result,
      36,
      'Expected total likes to be correct for the given list'
    )
  })
})

describe('favorite blog', () => {
  test('of an empty list is null', () => {
    const result = listHelper.favoriteBlog([])
    assert.equal(
      result,
      null,
      'Expected favorite blog to be null for an empty list'
    )
  })

  test('when list has only one blog, returns the blog itself', () => {
    const result = listHelper.favoriteBlog(data.listWithOneBlog)
    assert.deepStrictEqual(
      result._id,
      '5a422aa71b54a676234d17f8',
      'Expected blog id is not 5a422aa71b54a676234d17f8'
    )
  })

  test('of a bigger list is the one with the most likes', () => {
    const result = listHelper.favoriteBlog(data.bigList)
    assert.deepStrictEqual(
      result._id,
      '5a422b3a1b54a676234d17f9',
      'Expected favorite blog id is not 5a422b3a1b54a676234d17f9'
    )
  })
})

describe('most blogs', () => {
  test('of an empty list is null', () => {
    const result = listHelper.mostBlogs([])
    assert.strictEqual(
      result,
      null,
      'Expected number of blogs to be null for an empty list'
    )
  })

  test('when list has only one blog, returns blog itself', () => {
    const result = listHelper.mostBlogs(data.listWithOneBlog)
    assert.deepStrictEqual(
      result.blogs,
      1,
      'Expected number of blogs to be 1 for a single blog list'
    )
  })

  test('of a bigger list is the one with the most blogs', () => {
    const result = listHelper.mostBlogs(data.bigList)
    assert.strictEqual(
      result.blogs,
      3,
      'Expected number of blogs to be 3 for the given list'
    )
  })
})

describe('most likes', () => {
  test('of an empty list is null', () => {
    const result = listHelper.mostLikes([])
    assert.strictEqual(
      result,
      null,
      'Expected number of likes to be null for an empty list'
    )
  })

  test('when list has only one blog, returns blog itself', () => {
    const result = listHelper.mostLikes(data.listWithOneBlog)
    assert.deepStrictEqual(
      result.likes,
      5,
      'Expected the number of likes to match the likes of the single blog'
    )
  })

  test('of a bigger list is the one with the most likes', () => {
    const result = listHelper.mostLikes(data.bigList)
    assert.deepStrictEqual(
      result.likes,
      17,
      'Expected the number of likes to match the total likes of the author with the most likes in the list'
    )
  })
})
