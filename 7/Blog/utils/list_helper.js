const _ = require('lodash')

const dummy = (blogs) => {
    return 1;
}
const totalLikes = (blogs) => {
    if (Object.keys(blogs).length === 0) {
        return 0
    }
    return blogs.reduce((sum, blogs) => {
        return sum + Number(blogs.likes)
    }, 0)
}
const favoriteBlog = (blogs) => {
    let favorite = {}
    blogs.forEach(element => {
        if (Object.keys(favorite).length === 0) {
            favorite = element
        } else {
            if (favorite.likes < element.likes) {
                favorite = element
            }
        }
    })
    delete favorite.__v
    delete favorite._id
    delete favorite.url
    return favorite
}
const mostBlogs = (blogs) => {
    var result = _(blogs).groupBy(x => x.author)
                        .map((value, key) => ({'author': key, 'blogs': value}))
                        .value()
    result.map(x => {
        x.blogs = Object.keys(x.blogs).length
    })
    var highest = Math.max.apply(Math, result.map(x => x.blogs))
    return _.find(result, function(o) {return o.blogs == highest})
}
const mostLikes = (blogs) => {
    var result = _(blogs).groupBy(x => x.author)
                        .map((value, key) => ({'author': key, 'likes': value}))
                        .value()
    result.map(x => {
        x.likes = x.likes.reduce((sum, blog) => {
            return sum + Number(blog.likes)
        }, 0)
    })
    var highest = Math.max.apply(Math, result.map(x => x.likes))
    return _.find(result, function(o) {return o.likes == highest})

}


module.exports = {dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes}