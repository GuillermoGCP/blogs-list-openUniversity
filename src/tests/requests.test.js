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
    assert.ok(Array.isArray(response.body), 'Response must be an array')
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

  test('a valid blog is added', async () => {
    const newBlog = {
      title: 'New blog',
      author: 'New author',
      url: 'https://newblog.com',
      likes: 0,
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    assert.strictEqual(
      response.body.length,
      data.bigList.length + 1,
      'The number of blogs in the database was expected to be equal to the number of blogs in bigList plus one'
    )

    const addedBlog = response.body.find((blog) => blog.title === newBlog.title)
    assert.ok(addedBlog, 'The blog has not been added to the database')
  })

  test('a blog submitted without the Like property will default to Like: 0', async () => {
    const newBlog = {
      title: 'New blog',
      author: 'New author',
      url: 'https://newblog.com',
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(
      response.body.likes,
      0,
      'Expected likes value to be zero'
    )
  })
})
after(async () => {
  await mongoose.connection.close()
})
