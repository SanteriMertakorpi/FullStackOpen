import React, {useState, useEffect} from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import CountryData from './components/CountryData';
import CountryName from './components/CountryName';


const App = () => {
  
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [showAll, setShowAll] = useState(true)
  


  const hook = () => {
      axios
      .get('https://restcountries.com/v2/all')
      .then(response =>{
      setCountries(response.data)
      })
  }
  useEffect(hook,[])

  const handleFilterChange = (event) =>{
      setFilter(event.target.value)
      if(showAll){
          setShowAll(showAll===false)
      }
        
  }  
  const countriesToShow = showAll
      ? countries
      : countries.filter(country => 
        country.name.toLowerCase().includes(filter))
  
  
    

    
  if(countriesToShow.length===1){
    return(
      <div>
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
        {countriesToShow.map(country =>
          <CountryData key={country.numericCode} country={country} />
        )}
      </div>
    )
  }else if(countriesToShow.length<10){
    return(
      <div>
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
        {countriesToShow.map(country =>
          <CountryName key={country.numericCode} country={country} />
        )}
      </div>
    )
  }else{
    return(
      <div>
        <Filter filter={filter} handleFilterChange={handleFilterChange} />
        <p>Too many countries, specify another filter</p>
      </div>
    )
  }
    
}








export default App;
