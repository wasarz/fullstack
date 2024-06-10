import { useState, useEffect } from 'react'
import personService from './services/persons'
import axios from 'axios'

const Person = ({ person, del }) => {
  return (
    <p>{person.name} {person.number + ' '}
        <button onClick={del}>delete</button></p>
  )
}

const PersonForm = (props) => {
  console.log(props)
  return (
    <form onSubmit={props.addPerson}>
    <div>
      name: <input value={props.newName}
                   onChange={props.handleNameChange}/>
    </div>
    <div>
      number: <input value={props.newNumber}
                     onChange={props.handleNumberChange}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

const Filter = (props) => {
  console.log(props)
  return (
    <div>filter shown with <input value={props.newFilter}
    onChange={props.handleFilterChange}/></div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')

    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const personsToShow = showAll
    ? persons
    : persons.filter(p => p.name.toUpperCase().includes(newFilter.toUpperCase()))

  const addPerson = (event) => {
    event.preventDefault()
    console.log('old names are ', persons)
    console.log('new name is ', newName)

    if (persons.find(p => p.name === newName)) {
      if (confirm(`${newName} is already added to phonebook, replace
        the old number with a new one?`)) {
          updateNumber()
      }
      setNewName('')
      setNewNumber('')
      return
    }

    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const updateNumber = () => {
    const person = persons.find(p => p.name === newName)
    const changedPerson = { ...person, number: newNumber }

    personService
      .update(person.id, changedPerson)
      .then(response => {
        setPersons(persons.map(p => p.id !== person.id ? p : response.data))
        setNewName('')
      setNewNumber('')
      })
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const value = event.target.value
    setNewFilter(value)
    if (value === '') {
      setShowAll(true)
    }
    else {
      setShowAll(false)
    }
  }

  const del = (id) => {
    const person = persons.find(n => n.id === id)
    
    if (confirm(`Delete ${person.name}`)) {

      personService
        .del(person)
        .then(response => {
           setPersons(persons.filter(p => p.id !== id))
           console.log(response)
      })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newFilter={newFilter}
                   handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>
      
      <PersonForm addPerson={addPerson}
                     newName={newName}
                     handleNameChange={handleNameChange}
                     newNumber={newNumber}
                     handleNumberChange={handleNumberChange}/>
      
      <h3>Numbers</h3>

      {personsToShow.map(p => 
      <Person key={p.id} 
              person={p}
              del={() => del(p.id)} />
      )}

    </div>
  )

}

export default App