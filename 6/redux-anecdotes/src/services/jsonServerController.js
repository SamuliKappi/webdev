import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const createNew = async (data) => {
  const content = { content: data, votes: 0 }
  const res = await axios.post(baseURL, content)
  return res.data
}

const incrementVote = async (id) => {
  const res = await axios.get(`${baseURL}/${id}`)
  
  const updatedAnecdote = {
    ...res.data,
    votes: res.data.votes + 1
  }
  const response = await axios.put(`${baseURL}/${id}`, updatedAnecdote)
  return response.data
}

const exportedObject = {
  getAll,
  createNew,
  incrementVote
}

export default exportedObject