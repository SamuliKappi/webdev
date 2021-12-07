import anecdoteService from '../services/jsonServerController'

export const incrementVote = (id) => {
  return async dispatch => {
    const likedAnecdote = await anecdoteService.incrementVote(id)
    dispatch({
      type: 'LIKE',
      data: likedAnecdote
    })

  } 
}
export const addAnecdote = (data) => {
  return async dispatch => {
    const anecdote = await anecdoteService.createNew(data)
    dispatch({
      type: 'ADD',
      data: anecdote
    })

  }
}
export const initializeAnecdotes = () => {
  
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes 
    })

  }
}


const reducer = (state = [], action) => {
  switch (action.type) {
    case 'LIKE':
      const anecdoteToChange = state.find(a => a.id === action.data.id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== action.data.id ? anecdote : changedAnecdote
        )
    case 'ADD':
      return state.concat(action.data)
    case 'INIT_ANECDOTES':
      return action.data
    default: return state
  }
}

export default reducer