const { test, describe, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const data = require('./dataToTest.js')
const app = require('../../index.js')
const Blog = require('../db/models/Blog.js')
const User = require('../db/models/User.js')
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

    assert.deepStrictEqual(
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
      response.body.error,
      'Blog validation failed: url: Path `url` is required.',
      'Expected error message to indicate that URL is required'
    )
  })
  test('a blog submitted without title property will response with a 400 Bad Request status', async () => {
    const response = await api
      .post('/api/blogs')
      .send(data.blogWithoutTitle)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(
      response.body.error,
      'Blog validation failed: title: Path `title` is required.',
      'Expected error message to indicate that title is required'
    )
  })

  test('a blog is deleted and returns 204 No Content status', async () => {
    await api.delete(`/api/blogs/${data.bigList[0]._id.toString()}`).expect(204)

    const response = await Blog.findById({
      _id: data.bigList[0]._id.toString(),
    })

    assert.deepStrictEqual(
      response,
      null,
      'Expected response value of the deleted blog to be null'
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

//Users:
describe('users requests', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(data.manyUsers)
  })

  test('users are returned as json', async () => {
    const response = await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    assert.ok(Array.isArray(response.body), 'Response must be an array')
  })

  test('all users are returned', async () => {
    const response = await api.get('/api/users')

    assert.strictEqual(
      response.body.length,
      data.manyUsers.length,
      'Expected the number of users to be two'
    )
  })

  test('id property verification', async () => {
    const response = await api.get('/api/users')
    response.body.forEach((user) => {
      assert.ok(user.hasOwnProperty('id'))
    })
  })

  test('a valid user is added', async () => {
    await api
      .post('/api/users')
      .send(data.newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/users')

    assert.strictEqual(
      response.body.length,
      data.manyUsers.length + 1,
      'The number of users in the database was expected to be equal to the number of users in manyUsers plus one'
    )

    const addedUser = response.body.find(
      (user) => user.username === data.newUser.username
    )
    assert.ok(addedUser, 'The user has not been added to the database')
  })

  test('a user submitted without username property will response with a 400 Bad Request status', async () => {
    const response = await api
      .post('/api/users')
      .send(data.newUserWithOutUsername)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    assert.deepStrictEqual(
      response.body.error,
      'User validation failed: username: Path `username` is required.',
      'Expected error message to indicate that username is required'
    )
  })

  test('a user submitted without password property will response with a 400 Bad Request status', async () => {
    const response = await api
      .post('/api/users')
      .send(data.newUserWithOutPassword)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    assert.deepStrictEqual(
      response.body.error,
      'Password is required',
      'Expected error message to indicate that password is required'
    )
  })

  test('If a password of less than three characters is sent, it will respond with a 400 Bad Request status', async () => {
    const response = await api
      .post('/api/users')
      .send(data.newUserWithOutShortPass)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    assert.deepStrictEqual(
      response.body.error,
      'Password must be at least 3 characters long',
      'Expected error message indicating that the minimum length of a password is three'
    )
  })

  test('if a duplicate username is sent it will respond with a 400 Bad Request status', async () => {
    const response = await api
      .post('/api/users')
      .send(data.duplicateUsername)
      .expect(400)

    assert.deepStrictEqual(
      response.body.error,
      'expected `username` to be unique',
      'Expected error message indicating that the username already exists'
    )
  })
})
after(async () => {
  await mongoose.connection.close()
})
