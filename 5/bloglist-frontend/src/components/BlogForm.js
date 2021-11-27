import React, { useState } from 'react'
const BlogForm = ({
  handleNewBlog
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [blogFormVisible, setBlogFromVisible] = useState(false)

  const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
  const showWhenVisible = { display: blogFormVisible ? '' : 'none' }
  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={() => setBlogFromVisible(true)}>create a new blog</button>
      </div>
      <div style={showWhenVisible}>
        <h2>create new</h2>
        <form onSubmit={handleNewBlog} className='form'>
          <div>
            title:<input
              id='title'
              type="text"
              value={title}
              name="title"
              onChange={({ target }) => setTitle(target.value)}
            />
          </div>
          <div>
            author:<input
              id='author'
              type="text"
              value={author}
              name="author"
              onChange={({ target }) => setAuthor(target.value)}
            />
          </div>
          <div>
            url:<input
              id='url'
              type="text"
              value={url}
              name="url"
              onChange={({ target }) => setUrl(target.value)}
            />
          </div>
          <button type="submit" id='create-blog' onClick={() => setBlogFromVisible(false)}>create</button>
        </form>
        <button onClick={() => setBlogFromVisible(false)}>cancel</button>
      </div>

    </>
  )
}
export default BlogForm