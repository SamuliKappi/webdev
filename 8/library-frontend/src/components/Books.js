import React, { useEffect, useState } from 'react'
import { gql, useQuery, useLazyQuery } from '@apollo/client'
const ALL_BOOKS = gql`
query {
  allBooks {
    title
    published
    genres
    author {
      name
    }
  }
}
`

const Books = (props) => {
  let listofgenres = []
  let books
  const [filteredBooks, setFilteredBooks] = useState([])
  const [filter, setFilter] = useState('')
  const [test, setTest] = useState(false)
  const [getBooks, {loading, error, data}] = useLazyQuery(ALL_BOOKS)
  useEffect(() => {
    if (filter !== ''){
      console.log('kirjat' ,books)
      console.log('filtteredre kirjat', books.filter(book => book.genres.includes(filter) === true))
      setFilteredBooks(books.filter(book => book.genres.includes(filter) === true))
    }
  }, [filter])
  useEffect(() => {
    if (data && !loading) {
      console.log(data)
      books = data.allBooks
      setFilteredBooks(data.allBooks.filter(book => book.genres.includes(filter) === true))
    }
  }, [data, loading])
  const handleRefresh = () => {
    getBooks()
    console.log(data)
  }
  const result = useQuery(ALL_BOOKS)
  if (!props.show || result.loading) {
    return null
  }
  books = result.data.allBooks
  books.forEach(book => {
    listofgenres = listofgenres.concat(book.genres)
  })
  const ulist = [...new Set(listofgenres)]
  return (
    <div>
      <h2>books</h2>
      <div>in genre <b>{filter}</b></div>
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
          {test ? filteredBooks.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>) : books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        {ulist.map(genre => <button key={genre} onClick={() => (setFilter(genre), setTest(true), handleRefresh())}>{genre}</button>)}
        <button onClick={() => (setFilter(''), handleRefresh(), setTest(false))}>show all</button>
      </div>
    </div>
  )
}

export default Books