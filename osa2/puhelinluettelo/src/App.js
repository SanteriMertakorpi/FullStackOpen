import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persosns'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true)
  const [newFilter, setNewFilter] = useState('')
  

  useEffect(() =>{
    personService
      .getAll()
      .then(initialPersons =>{
        setPersons(initialPersons)
      })
  },[])

  

  const addPerson = (event) => {
    event.preventDefault()
    const nameObject = {
        name: newName,
        number: newNumber
      }
    
    let mapped = persons.map(p => p.name)
    
    
    if(mapped.includes(newName)){
      window.alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    }else{
      personService
        .create(nameObject)
        .then(returnedPerson =>{
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
      
      
    }
  }
  const deletePerson =id=>{
    const person = persons.find(p=>p.id===id)
    if(window.confirm(`Delete ${person.name} ?`)){
      personService
        .remove(id)
        .then(returnedPersons =>{
          setPersons(persons.filter(p=>p.id!==id))
        })
    }
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
        <Persons key={person.name} person={person} deletePerson={()=>deletePerson(person.id)}/>
      )}
      
      
    </div>
  )

}




export default App
