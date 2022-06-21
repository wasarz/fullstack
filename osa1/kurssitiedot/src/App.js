const Header = (props) => {
  console.log(props)
  return (
    <>
      <h1>{props.str}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.osa} {props.tehtava}</p>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part osa={props.parts[0].name} tehtava={props.parts[0].exercises}/>
      <Part osa={props.parts[1].name} tehtava={props.parts[1].exercises}/>
      <Part osa={props.parts[2].name} tehtava={props.parts[2].exercises}/>
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises }</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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
  return (
    <div>
      <Header str={course}/>
      <Content parts={parts} />
      <Total parts={parts}/>
    </div>
  )
}

export default App
