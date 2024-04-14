import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState("");
  const [error, setErr] = useState("");
  const [buttonColor, setButtonColor] = useState("");

  const fetchWeather = async () => {
    try {
      setButtonColor("#00008B");
      const response = await axios.get(`http://localhost:3300/weather/${city}`);
      const weatherInfo = response.data.result;
      setWeatherData(weatherInfo);
      setErr("");

      setTimeout(() => {
        setCity("");
        setButtonColor("");
      }, 2000);
    } catch (err) {
      console.log(err);
      setWeatherData("");
      setButtonColor("");
      setErr(err);
    }
  };
  useEffect(() => {
    setErr("");
  }, [city]);

  const parsedWeatherData = (weatherData)=>{
    const [weather, temperature, wind, moon]= weatherData.split(' ');
    return{weather, temperature, wind, moon};

  }
  const parseWeatherData= parsedWeatherData(weatherData);

  return (
    <div className="app-container">
    <div className='App'>
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city"
      />
      <button style={{ backgroundColor: buttonColor }} onClick={fetchWeather}>
        Get Weather
      </button>

      {error && <p className='error'>Error: {error}</p>}
      {parseWeatherData.weather &&(
        <div className='weather-data'>
          <p><label>Cloud:</label><span>{parseWeatherData.weather}</span></p>
          <p><label>Temp:</label><span>{parseWeatherData.temperature}</span></p>
          <p><label>Wind:</label><span>{parseWeatherData.wind}</span></p>
          <p><label>Moon:</label><span>{parseWeatherData.moon}</span></p>
        </div>
      )}
    </div>
    </div>
  );
}
export default App;


