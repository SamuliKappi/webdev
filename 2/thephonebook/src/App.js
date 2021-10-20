import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Person from './components/Person'
import Communication from './components/Communication'
import './index.css'

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
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ newState, setNewState ] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)
  const [status, setStatus] = useState(null)

  const addPerson = (event) =>{
    event.preventDefault()
    const exists = persons.map(person => person.name).includes(newName)
    
    if (exists) {
      window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      const dude = persons.find(Element => Element.name === newName)
      const personData = {
        name: newName,
        number: newNumber
      }
      Communication.updatePerson(dude.id, personData).then(Response => {
        setPersons(persons.map(person => person.id !== dude.id ? person : Response))
        setErrorMessage(`Added ${newName}`)
        setStatus("succ")
        setTimeout(() => {
          setErrorMessage(null)
      }, 5000)
      })
      setNewName("")
      setNewNumber("")
    } else{
      const personData = {
        name: newName,
        number: newNumber
      }
      Communication.postPerson(personData).then(Response => {
        setPersons(persons.concat(Response))
        setErrorMessage(`Added ${newName}`)
        setStatus("succ")
        setTimeout(() => {
          setErrorMessage(null)
      }, 5000)
      })
      setNewName("")
      setNewNumber("")
    }

  }
  

  const handleFilter = (event) => {
    if (event.target.value === "") {
      setNewState(true)
    } else {
      setNewState(false)
    }
    setNewFilter(event.target.value)
  }

  const handleInput = (event) => {
    setNewName(event.target.value)
  }
  const handleInputNumber = (event) => {
    setNewNumber(event.target.value)
  }
  useEffect(() => {
    Communication.getAll().then(response => {
      setPersons(response)
    })
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} status={status}/>
      <Filter
      newFilter={newFilter}
      handleFilter={handleFilter} 
      />
      <h2>add a new</h2>
      <Form 
      addPerson={addPerson}
      newName={newName}
      handleInput={handleInput}
      newNumber={newNumber}
      handleInputNumber={handleInputNumber}
      />
      <h2>Numbers</h2>
      <Person 
      persons={persons}
      newState={newState}
      newFilter={newFilter}
      setPersons={setPersons}
      setErrorMessage={setErrorMessage}
      setStatus={setStatus}
      />
    </div>
  )
}

export default App