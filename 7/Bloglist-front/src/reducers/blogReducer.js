let newstate = []
let blog
const blogReducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    state = state.concat(action.data)
    console.log('logging state')
    console.log(state)
    return state
  case 'INIT_BLOG':
    state = action.data
    return state
  case 'DELETE_BLOG':
    newstate = state.filter(element => element.id !== action.data)
    state = newstate
    return state
  case 'LIKE_BLOG':
    blog = state.find(element => element.id === action.data)
    blog.likes = blog.likes + 1
    newstate = state.map(element => element.id === action.data.id ? blog : element)
    state = newstate
    return state
  case 'ADD_COMMENT':
    console.log(action)
    newstate = state.map(ele => ele.id === action.data.id ? action.data : ele)
    state = newstate
    return state
  default:
    return state
  }
}
export const createBlog = (content) => {
  return {
    type: 'NEW_BLOG',
    data: content
  }
}
export const initBlog = (content) => {
  return {
    type: 'INIT_BLOG',
    data: content
  }
}
export const removeBlog = (id) => {
  return {
    type: 'DELETE_BLOG',
    data: id
  }
}
export const likeBlog = (blog) => {
  return {
    type: 'LIKE_BLOG',
    data: blog
  }
}
export const addComment = (blog) => {
  return {
    type: 'ADD_COMMENT',
    data: blog
  }
}
export default blogReducer