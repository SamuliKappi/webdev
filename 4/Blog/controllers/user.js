const bcrypt = require('bcryptjs')
const { response } = require('express')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res, next) => {
    const body = req.body
    if (body.password.length < 3) {
        res.status(400).end()
        return
    }
    const salt = 10
    const passwordHash = await bcrypt.hash(body.password, salt)
    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash
    })
    const savedUser = await user.save()
    res.json(savedUser).end()
})
usersRouter.get('/', async (req, res, next) => {
    const users = await User.find({}).populate('blogs', {title: 1, author: 1, url: 1, likes: 1})
    res.json(users).end() 
})



module.exports = usersRouter