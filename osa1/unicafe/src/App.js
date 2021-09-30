import './App.css';
import React, {useState} from 'react';

const Button =({handleClick, text}) =>(
  <button onClick={handleClick}>
    {text}
  </button>
)
const Headers= ({text}) =>(
  <h1>{text}</h1>
)
const StatisticLine =(props) =>{
  return(
    <table>
      <tbody>
        <tr>
          <td style={{width:'50px'}}>{props.text} </td>
          <td>{props.value} {props.symbol}</td>
        </tr>
        
      </tbody>
    </table>
    
  )
}
const Statistics =(props) =>{
  const good = props.good *1
  const neutral = props.neutral *0
  const bad = props.bad *-1

  if(props.good===0 && props.neutral===0 && props.bad===0){
    return(
      <div>
        No feedback given
      </div>
    )
  }
  
  
  return(
    <div>
      <StatisticLine text='good' value={props.good} symbol='' />
      <StatisticLine text='neutral' value={props.neutral} symbol=''  />
      <StatisticLine text='bad' value={props.bad} symbol=''  />
      <StatisticLine text ='all' value={props.good+props.bad+props.neutral} symbol=''  />
      <StatisticLine text = 'average' value={(good+neutral+bad)/(props.good+props.neutral+props.bad)} symbol=''  />
      <StatisticLine text = 'positive' value={props.good/(props.good+props.bad+props.neutral)*100} symbol='%'  />
      
    </div>
    
  )   
}




const App =() =>{
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood =() =>{
    setGood(good+1)
  }
  const handleNeutral =()=>{
    setNeutral(neutral+1)
  }
  const handleBad = () =>{
    setBad(bad+1)
  }

  return(
    <div>
      <Headers text ='give feedback' />
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <Headers text = 'statistics' />
      <Statistics  good={good} bad={bad} neutral={neutral} />
      

      
    </div>
  )
}


export default App;
