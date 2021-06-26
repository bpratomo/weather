import React, {useState } from "react";
import { WeatherDashboard } from "./components/WeatherDashboard";
import { ICurrentWeather } from "./interfaces/weatherInterface";
import { getWeather } from "./services/WeatherService";

import "./App.css";
import { WeatherForm } from "./components/WeatherForm";

function App() {
  const [weather, setWeather] = useState<ICurrentWeather | undefined>();

  async function fetchWeather(cityName: string) {
    const currentWeather = await getWeather(cityName);
    if (currentWeather) {
      setWeather(currentWeather);
      console.log(currentWeather);
    }
  }

  return (
    <div className="App">
      <div className="container">
        {weather ? (
          <WeatherDashboard weather={weather} />
        ) : (
          <WeatherForm updateWeather={fetchWeather} />
        )}
      </div>
    </div>
  );
}

export default App;
