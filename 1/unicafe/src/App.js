import React, { useState } from 'react'

const StatisticLine = (porps) => {
  return <tr><td>{porps.text}</td> <td>{porps.value}</td></tr>
}

const Statistic = (props) => {
  if (props.value4 === 0){
    return <div>No feedback given</div>
  }

  return (<div>
    <StatisticLine text={props.text1} value={props.value1} />
    <StatisticLine text={props.text2} value={props.value2} />
    <StatisticLine text={props.text3} value={props.value3} />
    <StatisticLine text={props.text4} value={props.value4} />
    <StatisticLine text={props.text5} value={props.value5} />
    <StatisticLine text={props.text6} value={props.value6} />
    </div>)
}
const Headers = (props) => <h1>{props.text}</h1>
const Button = (props) => <button onClick={props.handleClick}>{props.text}</button>



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)
  

  const handleGood = () => {
    setGood(good + 1)
    setAll(all + 1)
    setAverage((bad * -1 + good + 1) / (all+1))
    setPositive((good + 1)/(all + 1))
  }
  const handleBad = () => {
    setBad(bad + 1)
    setAll(all + 1)
    setAverage(((bad+1) * -1 + good) / (all+1))
    setPositive((good)/(all + 1))
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all + 1)
    setAverage((bad * -1 + good) / (all+1))
    setPositive((good)/(all + 1))
  }


  return (
    <div>
      <Headers text="give feedback" />
      <Button handleClick={() => handleGood()} text="good" />
      <Button handleClick={() => handleNeutral()} text="neutral" />
      <Button handleClick={() => handleBad()} text="bad" />
      <Headers text="statistics" />
      <Statistic text1="good" value1={good}
      text2="neutral" value2={neutral}
      text3="bad" value3={bad}
      text4="all" value4={all}
      text5="average" value5={average}
      text6="positive" value6={positive} />
    </div>
  )
}

export default App