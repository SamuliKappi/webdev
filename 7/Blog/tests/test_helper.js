const Blog = require('../models/blog')
const User = require('../models/user')

const initialUsers = [
  {
    _id: "5a422a851b54a676234d17f7",
    name: "mainman",
    username: "root",
    passwordHash:"$2a$10$7FQ0X/CJspHyw7V85eHwu.Rtr3kmwi1tza78zLKyxTAypbCXkqnZu",
    __v: 0
  },
  {
    _id: "5a422a851b54a676234d17f8",
    name: "reeee",
    username: "MichaelBangs",
    passwordHash:"$2a$10$7FQ0X/CJspHbw7V85eHwu.Rtr3kmwi1tza78zLKyxTAypbCXkqnZu",
    __v: 0
  },
  {
    _id: "5a422a851b54a676234d17f9",
    name: "React",
    username: "MichaelDangs",
    passwordHash:"$2a$10$7FQ0X/CJspHbw7V85eHwu.Rtr3kmwi1tta78zLKyxTAypbCXkqnZu",
    __v: 0
  },
  {
    _id: "5a422a851b54a676234d17fa",
    name: "Bebo",
    username: "Chungus",
    passwordHash:"$2a$10$7HQ0X/CJspHbw7V85eHwu.Rtr3kmwi1tta78zLKyxTAypbCXkqnZu",
    __v: 0
  }
]
const initialBlogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      user: null,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      user: null,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      user: null,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      user: null,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      user: null,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      user: null,
      __v: 0
    }  
  ]

const blogsinDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}
const usersinDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}
module.exports = {
    initialBlogs, blogsinDb, usersinDb, initialUsers
}