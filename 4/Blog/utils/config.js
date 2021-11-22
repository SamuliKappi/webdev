require('dotenv').config()
const PORT = process.env.PORT

const MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_URL
    : process.env.URL

module.exports = {
    MONGODB_URI,
    PORT
}