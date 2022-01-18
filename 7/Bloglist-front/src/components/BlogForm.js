import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
const BlogForm = ({
  handleNewBlog
}) => {
  const [blogFormVisible, setBlogFromVisible] = useState(false)

  const hideWhenVisible = { display: blogFormVisible ? 'none' : '' }
  const showWhenVisible = { display: blogFormVisible ? '' : 'none' }
  return (
    <>
      <div style={hideWhenVisible}>
        <Button variant="primary" onClick={() => setBlogFromVisible(true)}>create a new blog</Button>
      </div>
      <div style={showWhenVisible}>
        <h2>create new</h2>
        <form onSubmit={handleNewBlog} className='form'>
          <div>
            title:<input
              id='title'
              type="text"
              name="title"
            />
          </div>
          <div>
            author:<input
              id='author'
              type="text"
              name="author"
            />
          </div>
          <div>
            url:<input
              id='url'
              type="text"
              name="url"
            />
          </div>
          <Button variant="success" type="submit" id='create-blog' onClick={() => setBlogFromVisible(false)}>create</Button>
        </form>
        <Button variant="secondary" onClick={() => setBlogFromVisible(false)}>cancel</Button>
      </div>

    </>
  )
}
export default BlogForm