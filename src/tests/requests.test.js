const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const data = require('./dataToTest.js')
const app = require('../../index.js')
const Blog = require('../db/models/Blog.js')
const mongoose = require('mongoose')

const api = supertest(app)

describe('blogs requests', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(data.bigList)
  })

  test('blogs are returned as json', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    assert.ok(Array.isArray(response.body), 'Response must be an array')
  })

  test('all blogs are returned', async () => {
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

  test('a valid blog is added', async () => {
    await api
      .post('/api/blogs')
      .send(data.newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    assert.strictEqual(
      response.body.length,
      data.bigList.length + 1,
      'The number of blogs in the database was expected to be equal to the number of blogs in bigList plus one'
    )

    const addedBlog = response.body.find(
      (blog) => blog.title === data.newBlog.title
    )
    assert.ok(addedBlog, 'The blog has not been added to the database')
  })

  test('a blog submitted without the Like property will default to Like: 0', async () => {
    const response = await api
      .post('/api/blogs')
      .send(data.blogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(
      response.body.likes,
      0,
      'Expected likes value to be zero'
    )
  })
  test('a blog submitted without url property will response with a 400 Bad Request status', async () => {
    const response = await api
      .post('/api/blogs')
      .send(data.blogWithoutUrl)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(
      response.body.url,
      undefined,
      'Expected url value to be undefined'
    )
  })
  test('a blog submitted without  title property will response with a 400 Bad Request status', async () => {
    const response = await api
      .post('/api/blogs')
      .send(data.blogWithoutTitle)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(
      response.body.url,
      undefined,
      'Expected title value to be undefined'
    )
  })
})
after(async () => {
  await mongoose.connection.close()
})
