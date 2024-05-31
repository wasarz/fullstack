import { useState } from 'react'

const Statistics = (props) => {
  if (props.good === 0 && props.neutral === 0 && props.bad === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
  <table>
    <tbody>
      <StatisticLine text="good" value ={props.good} />
      <StatisticLine text="neutral" value ={props.neutral} />
      <StatisticLine text="bad" value ={props.bad} />
      <StatisticLine text="all" value ={props.good+props.neutral+props.bad} />
      <StatisticLine text="average" value ={average(props.good, props.neutral, props.bad)} />
      <StatisticLine text="positive" value ={positive(props.good, props.neutral, props.bad)} />
      </tbody>
  </table>
  ) 
}

const StatisticLine = (props) => {
  return (

    <tr>
     <td> {props.text} </td><td> {props.value} </td>
    </tr>    
  )
}

const average = (g, n, b) => {
  return Math.round(100*(g-b)/(g+b+n))/100
}

const positive = (g, n, b) => {
  const result = Math.round(100*(g/(g+n+b)))
  return result+' %'
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
  }

  const handleNeutral = () => {
    const updatedNeutral = neutral + 1
    setNeutral(updatedNeutral)
  }
  const handleBad = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
  }


  return (
    <div>
      <h1>give feedback</h1>

      <Button handleClick={handleGood} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleBad} text="bad" />

      <h1>statistics</h1>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App
