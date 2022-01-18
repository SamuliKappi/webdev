import { useSelector } from 'react-redux'
import React from 'react'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'
const Info = ( props ) => {
  console.log('at info', props)
  if (props === undefined) {
    return null
  }
  return <td>{props.name} {props.amount}</td>
}

const UserList = () => {
  const state = useSelector(state => state)
  console.log('userlist', state.userList)
  console.log('bloglist', state.blogs)
  if (state.userList.length === 0) {
    return null
  }
  return (
    <div>
      <h4>blogs created</h4>
      <Table striped hover>
        <tbody>
          {state.userList.map(element =>
            <tr key={element.id}><Link to={`/users/${element.id}`}> <Info name={element.name} amount={state.blogs.filter(ele => ele.user.name === element.name).length} /></Link></tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default UserList