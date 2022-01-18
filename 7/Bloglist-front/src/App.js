/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import User from './components/SingleUser'
import { useSelector, useDispatch } from 'react-redux'
import { createBlog, initBlog } from './reducers/blogReducer'
import { changeNotifi } from './reducers/notificationReducer'
import { login } from './reducers/userReducer'
import {
  BrowserRouter as Router,
  Routes, Route, Link, NavLink
} from 'react-router-dom'
import { addToList } from './reducers/userListReducer'
import UserList from './components/UserList'
import ExtendedBlog from './components/ExtendedBlog'
import { Table, Button, Nav, Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  if (notification === '') {
    return null
  } else {
    return (
      <Alert variant='primary'>
        {notification}
      </Alert>
    )
  }

}

const App = () => {
  const dispatch = useDispatch()
  const state = useSelector(state => state)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      dispatch(initBlog(blogs))
    })
    userService.getAll().then(users => {
      dispatch(addToList(users))
    })
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(login(user))
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log(event.target.username.value)
    try {
      const user = await loginService({ username: event.target.username.value, password: event.target.password.value })
      window.localStorage.setItem('user', JSON.stringify(user.data))
      blogService.setToken(user.data.token)
      dispatch(login(user.data))
    } catch (error) {
      dispatch(changeNotifi('Wrong credentials'))
      setTimeout(() => {
        dispatch(changeNotifi(null))
      }, 5000)
    }
  }
  const handleLogout = async () => {
    window.localStorage.removeItem('user')
    window.location.reload()
  }
  const handleNewBlog = async (event) => {
    event.preventDefault()
    const blog = {
      title: event.target[0].value,
      author: event.target[1].value,
      url: event.target[2].value
    }
    const res = await blogService.create(blog)
    if (res) {
      dispatch(createBlog(res))
      dispatch(changeNotifi(`a new blog ${res.title} by ${res.author} added`))
      setTimeout(() => {
        dispatch(changeNotifi(''))
      }, 5000)
    }
    console.log(state)
  }
  if (Object.keys(state.user).length === 0) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              name="username"
            />
          </div>
          <div>
            password
            <input
              type="password"
              name="password"
            />
          </div>
          <button type="submit" className='login-button'>login</button>
        </form>
      </div>
    )
  }

  return (
    <Router>
      <div className='container'>
        <div>
          <Nav defaultActiveKey="/" variant='tabs'>
            <Nav.Item>
              <Nav.Link><NavLink to='/'>blogs</NavLink></Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link><NavLink to='/users'>users </NavLink></Nav.Link>
            </Nav.Item>
            {state.user.name} has logged in <Button variant="danger" onClick={() => handleLogout()}>logout</Button>
          </Nav>

          <h2>blog app</h2>
          <Notification />
        </div>
        <Routes>
          <Route path='/blogs/:id' element={
            <ExtendedBlog />
          } />
          <Route path='/users/:id' element={
            <User />
          } />
          <Route path='/users' element={
            <div>
              <h2>Users</h2>
              <UserList />
            </div>
          } />
          <Route path='/' element={
            <>
              <BlogForm handleNewBlog={handleNewBlog} />
              <Table striped hover>
                <tbody id="blog-list">
                  {state.blogs.sort((f,s) => s.likes - f.likes).map(blog =>
                    <tr key={blog.id}><Link to={`/blogs/${blog.id}`} ><Blog blog={blog} /></Link></tr>
                  )}
                </tbody>
              </Table>
            </>
          }/>


        </Routes>
      </div>
    </Router>
  )
}

export default App