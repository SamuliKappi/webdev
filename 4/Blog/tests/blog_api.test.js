const mongoose = require('mongoose')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    await User.deleteMany({})
    const test = new User({
        "username": "testimies12345",
        "name": "turboman",
        "password": "123456"
    })
    await test.save()

})

test('/api/blogs returns the correct amount of blogs', async () =>{
    const response = await helper.blogsinDb()
    expect(response).toHaveLength(helper.initialBlogs.length)
}, 1000000)

test('Blogs unique identifier is named id', async () => {
    const response = await helper.blogsinDb()
    
    expect(response[0].id).toBeDefined()

})

test('post fails with 401 if no auth header is given', async () => {
    const newBlog = {
        "title": "Big bobo",
        "author": "Jorma2",
        "url": "www.blog3.com",
        "likes": 1337
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
    const response = await helper.blogsinDb()
    expect(response).toHaveLength(helper.initialBlogs.length)
}, 1000000)

test('likes defaults to 0', async () => {
    const newBlog = {
        "title": "Big bobo",
        "author": "Jorma3",
        "url": "www.blog2.com"
    }
    const user = await User.findOne({ username: "testimies12345" })
    const userForToken = {
        username: "testimies12345",
        id: user.id
    }
    const token = jwt.sign(userForToken, process.env.SECRET)

    await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${token}`)
        .expect(200)
    const response = await helper.blogsinDb()
    expect(response[response.length -1].likes).toEqual(0)
})

test('missing URL and title responds 400', async () => {
    const newBlog ={
        "author": "Jorma3",
        "likes": 1337
    }
    const user = await User.findOne({ username: "testimies12345" })
    const userForToken = {
        username: "testimies12345",
        id: user.id
    }
    const token = jwt.sign(userForToken, process.env.SECRET)
    await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `bearer ${token}`)
        .expect(400)
    const blogsAfter = await helper.blogsinDb()
    expect(blogsAfter).toHaveLength(helper.initialBlogs.length)
})

afterAll(() => {
    mongoose.connection.close()
})