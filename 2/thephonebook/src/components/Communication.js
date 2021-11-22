import axios from 'axios'
const baseUrl = '/api/persons'

const postPerson = newNote => {
    const request = axios.post(baseUrl, newNote)
    return request.then(Response => Response.data)
}
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(Response => Response.data)
}
const deletePerson = id => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(Response => Response.data)
}
const updatePerson = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(Response => Response.data)
}
const exportedObject = {postPerson, getAll, deletePerson, updatePerson}
export default exportedObject