import { useState } from 'react'

const Person = ({ person }) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

const Persons = ({personsToShow}) => {
  return (
    <>
    {personsToShow.map(p => 
      <Person key={p.name} person={p} />
    )}
    </>
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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [newFilter, setNewFilter] = useState('')

  const personsToShow = showAll
    ? persons
    : persons.filter(p => p.name.toUpperCase().includes(newFilter.toUpperCase()))

  const addPerson = (event) => {
    event.preventDefault()
    console.log('old names are ', persons)
    console.log('new name is ', newName)

    if (persons.find(p => p.name === newName)) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
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

      <Persons personsToShow={personsToShow} />

    </div>
  )

}

export default App