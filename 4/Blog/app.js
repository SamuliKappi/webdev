const config = require("./utils/config")
const express = require("express")
const app = express()
const cors = require("cors")
require('express-async-errors')
const userExtractor = require('./utils/userExtractor')
const tokenExtractor = require("./utils/tokenExtractor")
const blogsRouter = require("./controllers/blogs")
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/user')
const errorHandler = require('./utils/errorHandler')
const mongoose = require('mongoose')

mongoose.connect(config.MONGODB_URI)


app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(tokenExtractor)
app.use('/api/blogs', userExtractor , blogsRouter)
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
if (process.env.NODE_ENV === 'development') {
  const testingRouter = require('./controllers/reset')
  app.use('/api/testing', testingRouter)
}
app.use(errorHandler)

module.exports = app