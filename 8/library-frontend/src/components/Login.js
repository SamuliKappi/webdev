import React, { useState } from "react"
import { useMutation, gql } from "@apollo/client"
const LOGIN = gql`
mutation login($username: String!, $password: String!){
  login(username: $username, password: $password) {
    value
  }
}
`
const Login = (props) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [ login ] = useMutation(LOGIN)
  const handleLogin = async (e) => {
    e.preventDefault()
    const token = await login({ variables: { username, password }})
    console.log(token.data.login.value)
    props.setLogged(true)
    props.setPage('authors')
    props.setToken(token.data.login.value)
  }
  if (!props.show) {
    return null
  }
  return(
    <div>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            value={username}
            onChange={({target}) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type='password'
            value={password}
            onChange={({target}) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default Login