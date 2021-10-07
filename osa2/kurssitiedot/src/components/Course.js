import React from "react"
const Course = ({course}) =>{
    const parts = course.parts
  
    const exercisesl = parts.map(part=>part.exercises)
    const total = exercisesl.reduce((previousValue, currentValue) => previousValue + currentValue)
    return(
      <div>
      <Header course={course.name} />
      {parts.map(part =>
        <Content key={part.id} part={part.name} exercises={part.exercises} />,
      )}
      <Total totalExcercises={total}/>
      
      
      </div>
    )
}
const Header = (props) =>{
  return(
    <h2>{props.course}</h2>
  )
}
const Content =(props) =>{
  return(
      <p>{props.part} {props.exercises}</p>
  )
}
const Total =(props) =>{
  
  return(
      <b>
        total of {props.totalExcercises} exercises
      </b>
  )
}



export default Course