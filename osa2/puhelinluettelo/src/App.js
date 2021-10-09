import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persosns'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-1231244'
    },
    {
      name: 'Ada Lovelace',
      number: '39-44-5323523'
    },
    {
      name: 'Dan Abramov', 
      number: '12-43-234345'
    },
    {
      name: 'Mary Poppendieck',
      number: '39-23-6423122'
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [newFilter, setNewFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
        name: newName,
        number: newNumber
      }
    persons.forEach(person =>{
      if(person.name.includes(newName)){
      window.alert(`${newName} is already added to phonebook`)
    }else{
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }}) 
  }
  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }
  const handelNumberChange = (event) =>{
    setNewNumber(event.target.value)
  }
  
  const handleFilterChange = (event) =>{
    setNewFilter(event.target.value)
    if(showAll)
      setShowAll(showAll===false)
  }
  const personsToShow = showAll
    ? persons
    : persons.filter(person=> person.name.toLowerCase().includes(newFilter))

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Filter 
        newFilter={newFilter} 
        handleFilterChange={handleFilterChange} 
      />
      <h3>add a new </h3>

      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handelNumberChange={handelNumberChange} 
      />

      <h3>Numbers</h3>

      {personsToShow.map(person =>
        <Persons key={person.name} person={person} />
      )}
      
      
    </div>
  )

}




export default App
