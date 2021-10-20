const Form = (props) => {
    return (
    <form onSubmit={props.addPerson}>
        <div>
          name: <input
          value={props.newName}
          onChange={props.handleInput} />
        </div>
        <div>
          number: <input
          value={props.newNumber}
          onChange={props.handleInputNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default Form