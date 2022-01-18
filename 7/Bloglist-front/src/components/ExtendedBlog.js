import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import blogsService from '../services/blogs'
import { addComment, likeBlog } from '../reducers/blogReducer'

const ExtendedBlog = () => {
  const id = useParams().id
  const state = useSelector(state => state.blogs)
  const blog = state.find(ele => ele.id === id)
  const dispatch = useDispatch()
  const updateLikes = async () => {
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    await blogsService.updateBlog(blog.id, updatedBlog)
    dispatch(likeBlog(blog.id))
  }
  const updateComments = async (e) => {
    e.preventDefault()
    console.log('attempting to update comments')
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes,
      author: blog.author,
      title: blog.title,
      url: blog.url,
      id: blog.id,
      comments: blog.comments.concat(e.target.comment.value)
    }
    await blogsService.addComment(blog.id, updatedBlog)
    dispatch(addComment(updatedBlog))
  }
  console.log('at extendedblog')

  return (
    <div>
      <h2>{blog.title}</h2>
      <a href={blog.url} >{blog.url}</a>
      <p>likes {blog.likes} <button onClick={() => updateLikes()}>like</button></p>
      <p>Added by {blog.author}</p>
      <h2>Comments</h2>
      <form onSubmit={updateComments}>
        <div>
          <input type='text' name='comment' />
          <button type='submit'>add comment</button>
        </div>
      </form>
      <ul>
        {blog.comments.map((ele, i) =>
          <li key={i}>{ele}</li>
        )}
      </ul>
    </div>
  )
}
export default ExtendedBlog