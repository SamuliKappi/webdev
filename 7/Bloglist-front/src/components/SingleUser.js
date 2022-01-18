import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
const User = () => {
  const id = useParams().id
  const state = useSelector(state => state)
  const user = state.userList.find(ele => ele.id === id)
  if (user === undefined) {
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>
      <ul>
        {state.blogs.filter(ele => ele.user.id === id).map(ele =>
          <li key={ele.id}>{ele.title}</li>
        )}
      </ul>
    </div>
  )
}
export default User