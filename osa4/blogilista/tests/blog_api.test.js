const bcrypt = require('bcrypt')
const User = require('../models/user')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(2)
  })

  test('blogs have field id', async () => {
    const response = await api.get('/api/blogs')
    const ids = response.body.map(r => r.id)
    expect(ids).toBeDefined()
  })

  test('a blog can be added', async () => {
    const newBlog = {
      title: 'third blog',
      author: 'this is an author',
      url: 'here should be an url',
      likes: 2
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogsAtEnd =await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length +1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain('third blog')
  })

  test('if likes have no value, it is set to 0', async () => {
    const newBlog = {
      title: '4th blog',
      author: 'author of blog',
      url: 'this is an url'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
    
    const blogsAtEnd = await helper.blogsInDb()
    const likes = blogsAtEnd.map(b => b.likes)
    expect(likes).toContain(0)
  })

  test('without a title and an url there should be error', async () => {
    const newBlog = {
      author: 'this is not a valid blog',
      likes: 12
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('a blog can be removed', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length-1)
    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).not.toContain(blogToDelete.title)
  })

  test('a blogs like count can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const updatedBlog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes +1
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)
    const blogsAtEnd = await helper.blogsInDb()
    const likes = blogsAtEnd.map(b => b.likes)
    expect(likes[0]).toBe(updatedBlog.likes)
  })
})
describe('when there is initially two users at db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash1 = await bcrypt.hash('root', 10)
    const user1 = new User({ username:'root', name:'admin', passwordHash1 })
    await user1.save()
    const passwordHash2 = await bcrypt.hash('salainen', 10)
    const user2 = new User({ username: 'santemer', name:'Santeri Mertakorpi', passwordHash2})
    await user2.save()
  })

  test('creation succeeds with a valid username and password', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'hellas',
      name: 'Arto Hellas',
      password: 'salainen1',
    }
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length+1)
    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
  
  test('creation fails if username is not unique', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'root',
      name: 'Arto Hellas',
      password: 'salainen1',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('`username` to be unique')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
  test('creation fails if password is under 3 characters long', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'hellas',
      name: 'Arto Hellas',
      password: 'sa',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('password length must be over 3 characters')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
  test('creation fails if username is missing', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      name: 'Arto Hellas',
      password: 'salainen1',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('`username` is required')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
  test('creation fails if password is missing', async () => {
    const usersAtStart = await helper.usersInDb()
    const newUser = {
      username: 'hellas',
      name: 'Arto Hellas',
    }
    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)
    expect(result.body.error).toContain('password is required')
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})
afterAll(() => {
  mongoose.connection.close()
})