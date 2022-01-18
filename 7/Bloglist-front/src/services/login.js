import axios from 'axios'
const baseUrl = '/api/login'
const loginService = async (props) => {
  const request = await axios.post(baseUrl, {
    username: props.username,
    password: props.password
  })
  return request
}
export default loginService