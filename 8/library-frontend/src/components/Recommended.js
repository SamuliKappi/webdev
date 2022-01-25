import { gql, useLazyQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import jwt from 'jsonwebtoken'
const ALL_BOOKS = gql`
  query($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      genres
      author {
        name
      }
    }
  }
  `
const Recommended =  (props) => {
  const [user, setUser] = useState({})
  const [books, setBooks] = useState([])
  const [getBooks, {loading, error, data}] = useLazyQuery(ALL_BOOKS)
  
  useEffect(() => {
    if (props.token !== '') {
      setUser(jwt.verify(props.token, 'LMAOOOOOOOO'))
    }
  }, [props.page])
  useEffect(() => {
    if (Object.keys(user).length === 4) {
      getBooks({variables: { genre: user.favoriteGenre }})
    }
  }, [user])
  useEffect(() => {
    if (data && !loading) {
      console.log(data)
      setBooks(data.allBooks)
    }
  }, [data, loading])

  if (!props.show || loading) {
    return null
  } else {

  return (
    <div>
      <h2>recommendations</h2>
      <div>
        books in your favorite genre {user.favoriteGenre}
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a => 
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
}
export default Recommended