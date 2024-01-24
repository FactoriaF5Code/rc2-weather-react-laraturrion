
import { useState, useEffect } from 'react';
import './App.css';
import { Iconos } from './components/Iconos';



function App () {
  const [search, setSearch] = useState('')
  const [values, setValues] = useState('')
  const [icon, setIcon] = useState('')

  const URL=`https://api.openweathermap.org/data/2.5/weather?q=${search}&lang=es&units&metric&appid=dc09fe7e511f53decee79ff6155bd104`
  const getData = async () => {
    await fetch(URL)
    .then(response => {return response.json()})
    .then (data=> {
      if(data.cod >=400) {
        setValues(false)
      } else{
        console.log(data)
        console.log(data.weather[0].main)
        setIcon(data.weather[0].main)
        setValues(data)
      }
      console.log(data.name)
    })
    .catch(error=> {
      console.log(error)
    })
  } 

  const handleSearch = (e) => {
    if(e.key === 'Enter'){
      console.log(e.target.value)
      setSearch(e.target.value)
    }
  }

  useEffect (()=>{
    getData()

  },[search]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
  <div className="container">
  <h2> React Weather App </h2>
  <div className= "row">
    <input
      onKeyDown={handleSearch}
      type="text"
      autoFocus
     />
    </div>
  </div>

  <div className="card">
    {(values) ? (
      <h1></h1>
    ) : (
      <div className="cardContainer">
        <h1 className="city-name">{values.name}</h1>
        <img className="" src={Iconos(icon)} alt="WeatherIcons">
        </img>
      </div>
    )}
  </div>
  </>
);
}

export default App;