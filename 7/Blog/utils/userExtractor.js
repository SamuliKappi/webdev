const jwt = require('jsonwebtoken')

const getUserFrom = (request, response, next) => {
    const auth = request.get('authorization')
    if (auth && auth.toLowerCase().startsWith('bearer ')){
        const token = auth.substring(7)
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (token && decodedToken) {
            request.user = decodedToken
        }
    }
    next() 
}
module.exports = getUserFrom