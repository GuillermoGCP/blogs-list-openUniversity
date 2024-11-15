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
    const promisesArray = data.bigList.map((blog) => {
      const blogToSave = new Blog(blog)
      return blogToSave.save()
    })
    await Promise.all(promisesArray)
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
      6,
      'Expected the number of blogs to be six'
    )
  })
})
after(async () => {
  await mongoose.connection.close()
})
