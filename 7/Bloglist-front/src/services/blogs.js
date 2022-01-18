import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}
const create = async newObject => {
  const config = {
    headers: { Authorization: token }
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}
const updateBlog = async (id, blog) => {
  await axios.put(`${baseUrl}/${id}`, blog)
}
const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.delete(`${baseUrl}/${id}`, config)
}
const addComment = async (id, blog) => {
  await axios.put(`${baseUrl}/${id}/comments`, blog)
}

const exportedObject = { getAll, setToken, create, updateBlog, deleteBlog, addComment }
export default exportedObject