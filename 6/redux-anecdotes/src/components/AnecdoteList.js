import { incrementVote } from '../reducers/anecdoteReducer'
import { changeNotification } from '../reducers/notificationReducer'
import { useSelector, useDispatch } from 'react-redux'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    if (state.filter === '') {
      return state.anecdotes
    }
    // eslint-disable-next-line array-callback-return
    return state.anecdotes.filter(anecdote => {
      if (anecdote.content.includes(state.filter)) {
        return anecdote
      }
    })
  })
  const dispatch = useDispatch()

  const vote = (id, name) => {
    dispatch(incrementVote(id))
    dispatch(changeNotification(`you voted ${name}`, 1))
  }
  return (
    <>
    {anecdotes.sort((f, s) => s.votes - f.votes).map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
        </div>
      </div>
    )}
    </>
  )
}
export default AnecdoteList