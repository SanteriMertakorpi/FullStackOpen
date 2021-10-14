import React from "react";

const CountryData = ({country}) =>{
  
    return(
      <div>
        <h1>{country.name}</h1>
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h2>Spoken languages</h2>
        <ul>
          {country.languages && country.languages.map(language =>
            <li key={language.name}> {language.name} </li>)}
        </ul>
        <img 
          src={country.flags.png}
          
          alt='flag'
        />
        
          
      </div>
    )
}
export default CountryData