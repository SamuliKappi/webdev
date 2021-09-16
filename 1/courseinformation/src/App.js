import React from 'react'

const Header = (course) =>{
  return(
    <>
      <h1>
        {course.course.name}
      </h1>
    </>
  )
}

const Content = (values) => {
  return(
    <div>
      <Part part={values.parts.parts[0].name} exercises={values.parts.parts[0].exercises} />
      <Part part={values.parts.parts[1].name} exercises={values.parts.parts[1].exercises} />
      <Part part={values.parts.parts[2].name} exercises={values.parts.parts[2].exercises} />
    </div>
  )
}

const Part = (values) => {
  return(
    <>
    <p>{values.part} {values.exercises}</p>
    </>
  )
}

const Total = (data) =>{
  return(
    <>
      <p>
        Number of exercises {data.parts.parts[0].exercises + data.parts.parts[1].exercises + data.parts.parts[2].exercises}
      </p>
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={course} />
      <Total parts={course} />
    </div>
  )
}

export default App