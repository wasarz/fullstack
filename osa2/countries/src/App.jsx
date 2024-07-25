import { useState, useEffect } from 'react'
import axios from 'axios'

const Countries = ({ country, single, moreThanTen, show }) => {
  if (moreThanTen === true) {
    return
  } else if (single === true) {
    return (
      <Country country={country} />
    )
  } else
  return (
    <div>{country.name.common}
          <button onClick={show}>show</button></div>
  )
}


const Country = ({ country }) => {

  return (
    <>
    <h1>{country.name.common}</h1>

    <div>capital {country.capital}</div>
    <div>area {country.area}</div>
    <h3>languages:</h3>
    <ul>{Object.values(country.languages).map(l => <li key={l}> {l} </li>)}</ul>
    <img src={country.flags.png} alt={country.flags.alt} height='200' width='250'/>

    <h2>Weather in {country.capital}</h2>
    <Weather country={country} />
    </>
  )
}

const Weather = ({ country }) => {
  const api_key = import.meta.env.VITE_WEATHER_KEY
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    console.log('fetching weather...')
  axios
      .get(`https://api.openweathermap.org/data/2.5/weather?\
lat=${country.capitalInfo.latlng[0]}&\
lon=${country.capitalInfo.latlng[1]}&\
appid=${api_key}`)
      .then(response => {
        console.log(response.data)
        setWeather(response.data)})
  }, [])

  if (!weather) {
    return <p>Loading weather...</p>
  }

  return(
    <>
    <p>temperature {(weather.main.temp -273.5).toFixed(2)} Celsius</p>
    <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt='weather icon' />
    <p>wind {weather.wind.speed} m/s</p>
    </>
  )
}

const InstructionMessage = ({moreThanTen}) => {
  if (moreThanTen === false) {
    return
  } 
  else {
    return (
      <p>Too many matches, specify another filter</p> 
    )
  }
}

const App = () => {
  const [newFilter, setNewFilter] = useState('')
  const [countries, setCountries] = useState([])
  const [shownCountries, setShownCountries] = useState([])
  const [single, setSingle] = useState(false)
  const [moreThanTen, setMoreThanTen] = useState(true)


  useEffect(() => {
    console.log('effect run')

      console.log('fetching countries...')
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          setCountries(response.data)
        })
  }, [])

  const handleChange = (event) => {
    const c = event.target.value
    setNewFilter(c)
    const filteredCountries = (countries.filter(n => n.name.common.toUpperCase().includes(c.toUpperCase())))
    setShownCountries(filteredCountries)

    if (filteredCountries.length > 10) {
      setMoreThanTen(true)
      setSingle(false)
    } else if (filteredCountries.length > 1) {
      setMoreThanTen(false)
      setSingle(false)
    } else {
      setMoreThanTen(false)
      setSingle(true)
    }

  }

  const show = (c) => {
    setShownCountries([c])
    setSingle(true)
  }

  return (
    <div>
      <>find countries</> 
      <input 
        value={newFilter}
        onChange={handleChange}
      />
        <InstructionMessage moreThanTen={moreThanTen} />

        {shownCountries.map(c => 
          <Countries key={c.name.common}
                     country={c}
                     single={single}
                     moreThanTen={moreThanTen}
                     show={() => show(c)} />
        )}

    </div>
  )
}

export default App