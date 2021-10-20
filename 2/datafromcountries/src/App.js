import React, {useState, useEffect} from "react";
import axios from 'axios'


const Entry = (props) => {
  return <p>{props.name} <button onClick={() => {
    props.setClicked(true)
    props.setIndex(props.index)
  } }>show</button></p>
}

const ListEntry = (name) => {
  console.log(name);
  return <li>{name.name}</li>
}

const Countries = (props) => {
  console.log(props)
  if (props.list.length > 10 & !props.buttonClicked) {
    
    return <p>Too many matches, specify another filter</p>
  } else if (props.list.length < 10 & props.list.length > 1 & !props.buttonClicked) {
    
    return (
      <>
        {props.list.map((name, i) =>{
          return (
              <Entry
              key={i}
              name={name.name.common}
              index={i}
              setIndex={props.setNewButtonIndex}
              setClicked={props.setNewButtonClicked} />
          ) 
        }
        )}
      </>
    )

  } else if (props.list.length === 1 || props.buttonClicked){
    const keys = Object.keys(props.list[props.buttonIndex].languages)
    return (
      <>
        <h1>{props.list[props.buttonIndex].name.common}</h1>
        <p>capital {props.list[props.buttonIndex].capital}</p>
        <p>population {props.list[props.buttonIndex].population}</p>
        <h3>languages</h3>
        <ul>
          {keys.map((key, i) => 
           <ListEntry key={i} name={props.list[props.buttonIndex].languages[key]} />
          )}
        </ul>
        <img src={props.list[props.buttonIndex].flags["png"]} alt="rip flag"></img>
      </>
    )
  }
  return (
    <p></p>
  )
}

function App() {
  
  console.log(process.env.REACT_APP_WEATHER);
  const [newList, setNewList] = useState([])
  const [newButtonClicked, setNewButtonClicked] = useState(false)
  const [newButtonIndex, setNewButtonIndex] = useState(0)
  const [newInput , setNewInput] = useState("")
  useEffect(() => {
    const address = 'https://restcountries.com/v3.1/name/'
    const name = address.concat(newInput)
    axios.get(name).then(Response => {
      const data = Response.data
      setNewList(data)
    }).catch(error => {
      setNewList([])
    })}, [newInput])
  const handleInput = (event) => {
    setNewInput(event.target.value)
    setNewButtonClicked(false)
    setNewButtonIndex(0)

  }

  return (
    <div>
      find countries <input
      onChange={handleInput} />
      <Countries
      list={newList}
      buttonIndex={newButtonIndex}
      buttonClicked={newButtonClicked}
      setNewButtonClicked={setNewButtonClicked}
      setNewButtonIndex={setNewButtonIndex}
       />
    </div>
  );
}

export default App;
