const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: "Eka blogi",
    author: "Testi author",
    url: "aseta url",
    likes: 5
  },
  {
    title: "Toka",
    author: "Testi author",
    url: "url tähän",
    likes: 10
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}
module.exports = {
  initialBlogs,
  blogsInDb,
  usersInDb
}