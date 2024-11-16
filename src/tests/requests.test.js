const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const data = require('./dataToTest.js')
const app = require('../../index.js')
const Blog = require('../db/models/Blog.js')
const mongoose = require('mongoose')
const invalidIdGenerator = require('../utils/invalidIdGenerator.js')

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

  test('a blog is deleted and returns 204 No Content status', async () => {
    await api.delete(`/api/blogs/${data.bigList[0]._id.toString()}`).expect(204)

    const response = await Blog.findById({
      _id: data.bigList[0]._id.toString(),
    })

    assert.deepStrictEqual(
      response?.id,
      undefined,
      'Expected id value of the deleted blog to be undefined'
    )
  })

  test('a blog is updated correctly and returns 200 OK status', async () => {
    const response = await api
      .put(`/api/blogs/${data.bigList[0]._id.toString()}`)
      .send({ likes: 20 })
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(
      response.body.likes,
      20,
      'Expected likes value to be twenty'
    )
    assert.deepStrictEqual(
      response.body.title,
      'React patterns',
      'Expected title value to the given'
    )
    assert.deepStrictEqual(
      response.body.author,
      'Michael Chan',
      'Expected title value to the given'
    )
    assert.deepStrictEqual(
      response.body.url,
      'https://reactpatterns.com/',
      'Expected url value to the given'
    )
  })

  test('an invalid blog id is sent and returns 404 Not Found status', async () => {
    const nonExistingId = await invalidIdGenerator()

    await api.put(`/api/blogs/${nonExistingId}`).expect(404)
    await api.delete(`/api/blogs/${nonExistingId}`).expect(404)
  })
})

after(async () => {
  await mongoose.connection.close()
})
