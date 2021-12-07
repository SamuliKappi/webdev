import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteForm = (props) => {

  const createNew = async (event) => {
    event.preventDefault()
    const text = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.addAnecdote(text)
  }
  return (
    <>
    <h2>create new</h2>
    <form onSubmit={createNew}>
      <div><input name='anecdote' /></div>
      <button type='submit'>create</button>
    </form>
    </>
  )
}
const mapStateToProp = () => {
  return {}
}
const mapDispatchToProp = {
  addAnecdote
}
const ConnectedAnecdoteForm = connect(mapStateToProp, mapDispatchToProp)(AnecdoteForm)
export default ConnectedAnecdoteForm