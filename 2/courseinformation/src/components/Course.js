const reducer = (p, c) => p + c;

const Line = ({props}) => {
  return (
    <p>{props.name} {props.exercises}</p>
  )
}

const Course = ({course}) => {
  return (
    <>
      <h2>{course.name}</h2>
      <div  key={course.id}>
      {course.parts.map(info =>
      
        <Line key={info.id} props={info}/>
        
        )}
        
        <b>total of {course.parts.map(amount => amount.exercises).reduce(reducer)} exercises</b>
        </div>
    </>
  )
}

export default Course