import Communication from './Communication'
const Entry = (props) => {
    return (<p>{props.name} {props.number} <button onClick={() => {
        if (window.confirm(`Delete ${props.name}`)) {
            Communication.deletePerson(props.index)
            .catch(error => {
                props.setErrorMessage(`Information of ${props.name} has already been removed from server`)
                props.setStatus("error")
                setTimeout(() => {
                    props.setErrorMessage(null)
                    props.setStatus(null)
                }, 5000)
            }).then(response => {
                return Communication.getAll()
            }).then(response => {
                props.setPersons(response)
              })
        }
    }}>delete</button></p> )
  }

const Person = (props) => {
    const personsToShow = props.newState
    ? props.persons
    : props.persons.filter(person => person.name.includes(props.newFilter) === true)

    return (
        <div>
            {personsToShow.map((person) =>
                <Entry key={person.id} name={person.name} number={person.number}
                index={person.id} setPersons={props.setPersons}
                setErrorMessage={props.setErrorMessage}
                setStatus={props.setStatus}
                />)}
        </div>
    )
}

export default Person