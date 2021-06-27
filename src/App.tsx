import React, { useEffect, useState } from "react";
import { WeatherDashboard } from "./components/WeatherDashboard";
import { ICurrentWeather } from "./interfaces/weatherInterface";
import { getWeather } from "./services/WeatherService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

import "./App.css";
import { WeatherForm } from "./components/WeatherForm";
import { Sidebar } from "./components/Sidebar";

function App() {
  const [weather, setWeather] = useState<ICurrentWeather | undefined>();
  const [savedWeathers, setSavedWeathers] =
    useState<ICurrentWeather[] | undefined>();
  const [sidebarVisible, setSidebarVisibility] = useState<boolean>(true);

  async function fetchWeather(cityName: string) {
    const currentWeather = await getWeather(cityName);
    if (currentWeather) {
      setWeather(currentWeather);
      console.log(currentWeather);
    }
  }

  function setActiveWeather(weather:ICurrentWeather){
    toggleVisibility()
    setWeather(weather)
  }

  async function seedWeatherList(
    cityList: string[]
  ): Promise<ICurrentWeather[]> {
    let promiseList = cityList.map((city) => getWeather(city));
    let weatherList = await Promise.all(promiseList);
    return weatherList;
  }

  function toggleVisibility() {
    setSidebarVisibility(!sidebarVisible);
  }

  useEffect(() => {
    console.log("called");
    seedWeatherList([
      "Amsterdam",
      "London",
      "New York",
      "Jakarta",
      "Bandung",
    ]).then((weathers) => {
      setSavedWeathers(weathers);
    });
  }, []);

  const toggleButtonStyle = {
    position: "absolute" as "absolute",
    left: "10px",
    top: "10px",
    backgroundColor: "#6A2C70",
    color: "white",
    borderRadius: "10px",
    height: "40px",
    width: "auto",
    border: "none",
    fontSize: "x-large",
    fontFamily: "Itim",
  };

  return (
    <div className="App">
      <div className="container">
        <button style={toggleButtonStyle} onClick={toggleVisibility}>
          <FontAwesomeIcon icon={faBars} /> Saved Cities
        </button>

        {sidebarVisible && (
          <Sidebar
            weatherList={savedWeathers}
            toggleVisibility={toggleVisibility}
            setWeather = {setActiveWeather}
          />
        )}

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
