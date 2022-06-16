const Header = (props) => {
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
      <Part osa={props.osa1} tehtava={props.tehtavat1}/>
      <Part osa={props.osa2} tehtava={props.tehtavat2}/>
      <Part osa={props.osa3} tehtava={props.tehtavat3}/>
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.summa}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header str={course}/>
      <Content osa1={part1} osa2={part2} osa3={part3}
       tehtavat1={exercises1} tehtavat2={exercises2} tehtavat3={exercises3}/>
      <Total summa={exercises1+exercises2+exercises3}/>
    </div>
  )
}

export default App