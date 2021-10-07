import React, {useState} from 'react';

const Button = ({handleClick, text}) =>(
  <button onClick={handleClick} >
    {text}
  </button>
)
const Headers = (props) =>{
  return(
    <h1>{props.text}</h1>
  )
}

const AnecdoteOfTheDay = (props) =>{
  return(
    <div>
      <p>{props.index1}</p>
      <p>has {props.index2} votes </p>
    </div>
  )
}





const App =() =>{
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
  const [selected, setSelected] = useState(0)
  const [voteList, setVote] = useState([])
  
  
  const handleSelected = () =>{
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }
  const giveVote=()=>{
    setVote({...voteList, [selected]:(voteList[selected]??0)+1})
  }
  return(
    <div>
      <Headers text='Anecdote of the day' />
      <AnecdoteOfTheDay index1={anecdotes[selected]} index2={voteList[selected]} />
      <Button handleClick={giveVote} text='vote' />
      <Button handleClick={handleSelected} text='next anecdote'/>
      
      
      
    </div>
  )
}

export default App;
