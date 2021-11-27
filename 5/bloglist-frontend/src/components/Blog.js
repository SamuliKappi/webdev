import React, { useState } from 'react'
import blogsService from '../services/blogs'
import PropTypes from 'prop-types'
const Blog = (props) => {
  const [showInfo, setShowInfo] = useState(false)
  const hideWhenVisible = { display: showInfo ? 'none' : '' }
  const showWhenVisible = { display: showInfo ? '' : 'none' }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const update = async () => {
    const updatedBlog = {
      user: props.blog.user.id,
      likes: props.blog.likes + 1,
      author: props.blog.author,
      title: props.blog.title,
      url: props.blog.url
    }
    await blogsService.updateBlog(props.blog.id, updatedBlog)
    props.setReloadBlogs(!props.reloadBlogs)
  }
  const deleteBlog = async () => {
    if(window.confirm(`Remove blog ${props.blog.title} by ${props.blog.author}`)){
      await blogsService.deleteBlog(props.blog.id)
      props.setReloadBlogs(!props.reloadBlogs)
    }

  }
  return (
    <div style={blogStyle}>
      <div>
        {props.blog.title} by {props.blog.author}
        <button style={hideWhenVisible} onClick={() => setShowInfo(true)}>view</button>
        <button style={showWhenVisible} onClick={() => setShowInfo(false)}>hide</button>
      </div>
      <div style={showWhenVisible} className='togglableContent'>
        <div>{props.blog.url}</div>
        <div>{props.blog.likes} <button className='likeButton' onClick={() => update()}>like</button></div>
        <div>{props.blog.user.name}</div>
        <button onClick={() => deleteBlog()}>remove</button>
      </div>
    </div>
  )

}

Blog.propTypes = {
  setReloadBlogs: PropTypes.func.isRequired,
  reloadBlogs: PropTypes.bool.isRequired,
  blog: PropTypes.object.isRequired
}

export default Blog