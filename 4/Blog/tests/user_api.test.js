const { TestWatcher } = require('@jest/core')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const helper = require('./test_helper')
const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(helper.initialUsers)
})

describe('user validity', () => {
    test('invalid user is not created', async () => {
        const newUser = {
            "name": "yes",
            "username": "ye",
            "password": "y"
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    const response = await helper.usersinDb()
    expect(response).toHaveLength(helper.initialUsers.length)
    })
})
afterAll(() => {
    mongoose.connection.close()
})