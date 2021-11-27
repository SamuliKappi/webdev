import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'

const Notification = (props) => {
  if (props.message === null) {
    return null
  } else {
    return (
      <div className={props.status}>
        {props.message}
      </div>
    )
  }

}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [reloadBlogs, setReloadBlogs] = useState(false)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )

  }, [reloadBlogs])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }

  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService({ username: username, password: password })
      window.localStorage.setItem('user', JSON.stringify(user.data))
      blogService.setToken(user.data.token)
      setUser(user.data)
      setUsername('')
      setPassword('')
    } catch (error) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
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
      setReloadBlogs(!reloadBlogs)
      setErrorMessage(`a new blog ${res.title} by ${res.author} added`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit" className='login-button'>login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={errorMessage} />
      <div>{user.name} has logged in <button onClick={() => handleLogout()}>logout</button></div>
      <BlogForm handleNewBlog={handleNewBlog} />
      <div id="blog-list">
        {blogs.sort((f,s) => s.likes - f.likes).map(blog =>
          <Blog key={blog.id} blog={blog}
            reloadBlogs={reloadBlogs}
            setReloadBlogs={setReloadBlogs}
          />
        )}
      </div>

    </div>
  )
}

export default App