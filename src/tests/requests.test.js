const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const data = require('./dataToTest.js')
const app = require('../../index.js')
const Blog = require('../db/models/Blog.js')
const mongoose = require('mongoose')

const api = supertest(app)

describe('requests', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(data.bigList)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are six blogs', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(
      response.body.length,
      data.bigList.length,
      'Expected the number of blogs to be six'
    )
  })

  test('id property verification', async () => {
    const response = await api.get('/api/blogs')
    response.body.forEach((blog) => {
      assert.ok(blog.hasOwnProperty('id'))
    })
  })
})
after(async () => {
  await mongoose.connection.close()
})
