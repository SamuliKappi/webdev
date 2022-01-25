import { useSubscription, gql } from '@apollo/client'
import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import Recommended from './components/Recommended'
const BOOKS_SUBSCRIPTION = gql`
subscription {
  bookAdded {
    ...BookDetails
  }
}

`

const App = () => {
  const [page, setPage] = useState('authors')
  const [logged, setLogged] = useState(false)
  const [token, setToken] = useState('')
  useSubscription(BOOKS_SUBSCRIPTION, {
    onSubscriptionData: ({subData}) => {
      console.log('okay')
      window.alert('a new book is added')
    }
  })
  const handleLogout = () => {
    setLogged(false)
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {logged ? <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommended')}>recommended</button>
            <button onClick={() => handleLogout()}>logout</button>
          </> :
          <button onClick={() => setPage('login')}>login</button>}
        
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Login
        show={page ==='login'}
        setLogged={setLogged}
        setPage={setPage}
        setToken={setToken}
      />
      <Recommended
        show={page ==='recommended'}
        token={token}
        page={page}
      />
    </div>
  )
}

export default App