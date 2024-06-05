  const Part = (props) => {
    console.log('Part toimii')
    console.log(props)
    return (
      <p>{props.part.name} {props.part.exercises}</p>
    )
  }
  
  const Header = (props) => {
    console.log('Header toimii')
    console.log(props)
    return <h2>{props.course.name}</h2>
    }
  
  const Content = (props) => {
    console.log('Content toimii')
    console.log(props)
    const { parts } = props
    return (
      <>
        {parts.map(p =>
          <Part part={p} />
        )}
      </>
    )
  }
  
  const Total = (props) => {
    console.log(props)
    const { parts } = props
    return (
      <p><b>total of {parts.reduce( (sum, p) =>
       sum + p.exercises, 0 )} exercises </b></p>
    )
  }
  
  const Course = (props) => {
    console.log(props)
    console.log('Course toimii')
    return (
      <>
      <Header course={props.course} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
      </>
    )
  }
  export default Course