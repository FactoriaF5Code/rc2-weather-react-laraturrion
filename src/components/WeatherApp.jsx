import "./weatherApp.css";


const WeatherApp = () => {
  return (
    <div className="container">
      <nav className="nav">
        <input type="text" className="cityInput" placeholder="Search" />
        <div className="searchIcon"></div>
      </nav>
    </div>
  );
};

export default WeatherApp;