const listHelper = require('../utils/list_helper.js')
const { test, describe } = require('node:test')
const assert = require('node:assert')

test('dummy returns one', () => {
  const blogs = []
  const result = listHelper.dummy(blogs)
  assert.equal(result, 1, 'result is not an array')
})
