import React, { useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
    id
  }
}
`
const UPDATE_BORN = gql`
  mutation editAuthor($name: String!, $year: Int) {
    editAuthor(
      name: $name,
      setBornTo: $year
    ) {
      name,
      born,
      id
    }
  }
`

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const result = useQuery(ALL_AUTHORS)
  const [ editAuthor ] = useMutation(UPDATE_BORN)
  if (!props.show || result.loading) {
    return null
  }
  const updateAuthor = async (e) => {
    e.preventDefault()
    const year = parseInt(born)
    editAuthor({ variables: { name, year }})
    setBorn('')
  }
  
  const authors = result.data.allAuthors
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={updateAuthor}>
        <select onChange={({target}) => setName(target.value)}>
          <option value=''>Select an author</option>
          {authors.map(a => 
            <option key={a.id} value={a.name}>{a.name}</option>
          )}
        </select>
        <div>
          born
          <input
            value={born}
            type='number'
            onChange={({target}) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
