const { response } = require("express")
const { Mongoose } = require("mongoose")
const Blog = require("../models/blog")
const blogsRouter = require('express').Router()
const User = require("../models/user")
const jwt = require('jsonwebtoken')

blogsRouter.get('/',  async (request, response, next) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs).end()
})
  
blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    if (!request.user) {
      return response.status(401).json({ error: "token missing or invalid" })
    }
    const user = await User.findById(request.user.id)
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await User.findByIdAndUpdate(body.userID, user)
    response.json(savedBlog).end()
})

blogsRouter.get('/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (blog) {
      res.json(blog)
    } else {
      res.status(404).end()
    }
  } catch (exception){
    res.status(400).end()
  }
  
})

blogsRouter.put('/:id', async (req, res, next) => {
  const body = req.body
  const blog = {
    "title": body.title,
    "author": body.author,
    "url": body.url,
    "likes": body.likes,
    "comments": body.comments
  }
    await Blog.findByIdAndUpdate(req.params.id, blog, {new: true})
    res.status(200).end()
})

blogsRouter.delete('/:id', async (req, res, next) => {
  const blogToBeDeleted = await Blog.findById(req.params.id)
  if (blogToBeDeleted.user.toString() != req.user.id.toString()){
    return response(401).json({ error: "Token missing or invalid" })
  } else {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
  }
})

blogsRouter.put('/:id/comments', async (req, res, next) => {
  const body = req.body
  const blog = {
    "title": body.title,
    "author": body.author,
    "url": body.url,
    "likes": body.likes,
    "comments": body.comments
  }
  await Blog.findByIdAndUpdate(req.params.id, blog, {new: true})
  res.status(200).end()
})

module.exports = blogsRouter