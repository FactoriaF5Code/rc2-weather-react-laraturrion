import { useState, useEffect } from "react";
import "./App.css";
import Iconos from "./components/Iconos";

function App() {
  const [search, setSearch] = useState("");
  const [values, setValues] = useState("");
  const [icon, setIcon] = useState("");

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${search}&lang=es&units&metric&appid=dc09fe7e511f53decee79ff6155bd104`;
  const getData = async () => {
    await fetch(URL)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.cod >= 400) {
          setValues(false);
        } else {
          console.log(data);
          console.log(data.weather[0].main);
          setIcon(data.weather[0].main);
          setValues(data);
        }
        console.log(data.name);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      console.log(e.target.value);
      setSearch(e.target.value);
    }
  };

  const kelvinToCelsius = (kelvin) => {
    return kelvin - 273.15;
  };

  useEffect(() => {
    getData();
  }, [search]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
    <main className= "mainContainer">
      <div className="container">
        <h2> React Weather App </h2>
        <div className="row">
          <input onKeyDown={handleSearch} type="text" autoFocus />
        </div>
      </div>
      <div className="card">
        {values ? (
          <div className="cardContainer">
            <h1 className="cityName">{values.name}</h1>
            <p className="temp">
              {kelvinToCelsius(values.main.temp).toFixed(0)}&deg;
            </p>
            <img className="icon" src={Iconos(icon)} alt="icon Weather"></img>
            <div className="cardFooter">
              <p className="tempmaxmin">
                <p className="description"> Temperatura mínima y máxima prevista</p>
                {kelvinToCelsius(values.main.temp_min).toFixed(0)}&deg; |{" "}
                {kelvinToCelsius(values.main.temp_max).toFixed(0)}&deg;
              </p>
            </div>
          </div>
        ) : (
          <h1>Cargando...</h1>
        )}
      </div>
      </main>
    </>
  );
}

export default App;
